export interface Companion {
  id: string;
  name: string;
  description: string;
  icon: string;
  greeting: string;
  systemPrompt: string;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export interface ChatSession {
  id: string;
  companionId: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}