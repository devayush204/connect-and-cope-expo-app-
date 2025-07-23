import { useState, useCallback } from 'react';
import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Message, ChatSession, Companion } from '@/types';
import { companions } from '@/constants/companions';

const STORAGE_KEY = 'connect_cope_chats';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

interface ChatState {
  sessions: ChatSession[];
  activeSessionId: string | null;
  isLoading: boolean;
  error: Error | null;
}

type CoreMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export const [ChatProvider, useChatContext] = createContextHook(() => {
  const [state, setState] = useState<ChatState>({
    sessions: [],
    activeSessionId: null,
    isLoading: false,
    error: null,
  });

  // Load chat sessions from AsyncStorage
  const chatsQuery = useQuery({
    queryKey: ['chats'],
    queryFn: async () => {
      try {
        const storedChats = await AsyncStorage.getItem(STORAGE_KEY);
        return storedChats ? JSON.parse(storedChats) as ChatSession[] : [];
      } catch (error) {
        console.error('Failed to load chats:', error);
        return [];
      }
    },
  });

  // Save chat sessions to AsyncStorage
  const saveMutation = useMutation({
    mutationFn: async (sessions: ChatSession[]) => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
        return sessions;
      } catch (error) {
        console.error('Failed to save chats:', error);
        throw error;
      }
    },
  });

  // Update state when chats are loaded
  useState(() => {
    if (chatsQuery.data) {
      setState(prev => ({
        ...prev,
        sessions: chatsQuery.data,
        isLoading: chatsQuery.isLoading,
        error: chatsQuery.error as Error | null,
      }));
    }
  });

  // Start a new chat session with a companion
  const startChat = useCallback((companion: Companion) => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      companionId: companion.id,
      messages: [
        {
          id: Date.now().toString(),
          content: companion.greeting,
          role: 'assistant',
          timestamp: Date.now(),
        },
      ],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setState(prev => {
      const updatedSessions = [...prev.sessions, newSession];
      saveMutation.mutate(updatedSessions);
      return {
        ...prev,
        sessions: updatedSessions,
        activeSessionId: newSession.id,
      };
    });

    return newSession.id;
  }, []);

  // Send a message in the active chat session
  const sendMessage = useCallback(async (content: string) => {
    if (!state.activeSessionId) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: Date.now(),
    };

    setState(prev => {
      const updatedSessions = prev.sessions.map(session => {
        if (session.id === prev.activeSessionId) {
          return {
            ...session,
            messages: [...session.messages, userMessage],
            updatedAt: Date.now(),
          };
        }
        return session;
      });

      saveMutation.mutate(updatedSessions);
      return {
        ...prev,
        sessions: updatedSessions,
      };
    });

    // Get the active session and companion
    const activeSession = state.sessions.find(s => s.id === state.activeSessionId);
    if (!activeSession) return;

    const companion = companions.find(c => c.id === activeSession.companionId);
    if (!companion) return;

    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Build conversation history for AI context
      const conversationMessages: CoreMessage[] = [
        {
          role: 'system',
          content: companion.systemPrompt
        }
      ];

      // Add conversation history (excluding the greeting message)
      const historyMessages = [...activeSession.messages, userMessage].slice(1);
      historyMessages.forEach(msg => {
        conversationMessages.push({
          role: msg.role,
          content: msg.content
        });
      });

      // Call the AI API
      const response = await fetch('https://toolkit.rork.com/text/llm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: conversationMessages,
          apiKey: GEMINI_API_KEY
        }),
      });

      if (!response.ok) {
        throw new Error(`AI API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.completion;
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: Date.now(),
      };

      setState(prev => {
        const updatedSessions = prev.sessions.map(session => {
          if (session.id === prev.activeSessionId) {
            return {
              ...session,
              messages: [...session.messages, aiMessage],
              updatedAt: Date.now(),
            };
          }
          return session;
        });

        saveMutation.mutate(updatedSessions);
        return {
          ...prev,
          sessions: updatedSessions,
          isLoading: false,
        };
      });
    } catch (error) {
      console.error('AI API error:', error);
      
      // Add fallback message on error
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        role: 'assistant',
        timestamp: Date.now(),
      };

      setState(prev => {
        const updatedSessions = prev.sessions.map(session => {
          if (session.id === prev.activeSessionId) {
            return {
              ...session,
              messages: [...session.messages, errorMessage],
              updatedAt: Date.now(),
            };
          }
          return session;
        });

        saveMutation.mutate(updatedSessions);
        return {
          ...prev,
          sessions: updatedSessions,
          isLoading: false,
          error: error as Error,
        };
      });
    }
  }, [state.activeSessionId, state.sessions]);

  // Set the active chat session
  const setActiveSession = useCallback((sessionId: string | null) => {
    setState(prev => ({
      ...prev,
      activeSessionId: sessionId,
    }));
  }, []);

  // Get the active chat session
  const getActiveSession = useCallback(() => {
    return state.sessions.find(s => s.id === state.activeSessionId) || null;
  }, [state.activeSessionId, state.sessions]);

  // Get the companion for a session
  const getSessionCompanion = useCallback((sessionId: string) => {
    const session = state.sessions.find(s => s.id === sessionId);
    if (!session) return null;
    return companions.find(c => c.id === session.companionId) || null;
  }, [state.sessions]);

  return {
    sessions: state.sessions,
    activeSessionId: state.activeSessionId,
    isLoading: state.isLoading || chatsQuery.isLoading,
    error: state.error || chatsQuery.error as Error | null,
    startChat,
    sendMessage,
    setActiveSession,
    getActiveSession,
    getSessionCompanion,
  };
});

// Custom hook to get the active chat session
export function useActiveChat() {
  const { activeSessionId, getActiveSession, getSessionCompanion, isLoading } = useChatContext();
  
  const activeSession = getActiveSession();
  const companion = activeSession ? getSessionCompanion(activeSession.id) : null;
  
  return {
    session: activeSession,
    companion,
    isLoading,
    hasActiveChat: !!activeSessionId,
  };
}