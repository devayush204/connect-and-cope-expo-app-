import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useChatContext } from '@/hooks/useChatStore';
import { companions } from '@/constants/companions';
import CompanionCard from '@/components/CompanionCard';
import Colors from '@/constants/Colors';

export default function CompanionsScreen() {
  const router = useRouter();
  const { startChat } = useChatContext();

  const handleSelectCompanion = (companion) => {
    const sessionId = startChat(companion);
    router.push(`/chat/${sessionId}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Choose Your Companion</Text>
        <Text style={styles.subtitle}>
          Select an AI companion designed to understand your specific emotional needs
        </Text>

        <View style={styles.companionsContainer}>
          {companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              companion={companion}
              onSelect={handleSelectCompanion}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 22,
  },
  companionsContainer: {
    marginTop: 8,
  },
});