import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Heart, Users, Brain, Smile, Coffee, Target } from 'lucide-react-native';
import { Companion } from '@/types';
import Colors from '@/constants/Colors';

interface CompanionCardProps {
  companion: Companion;
  onSelect: (companion: Companion) => void;
}

export default function CompanionCard({ companion, onSelect }: CompanionCardProps) {
  const renderIcon = () => {
    const iconProps = { 
      size: 24, 
      color: Colors.primary,
      strokeWidth: 2
    };

    switch (companion.icon) {
      case 'heart':
        return <Heart {...iconProps} />;
      case 'users':
        return <Users {...iconProps} />;
      case 'brain':
        return <Brain {...iconProps} />;
      case 'smile':
        return <Smile {...iconProps} />;
      case 'coffee':
        return <Coffee {...iconProps} />;
      case 'target':
        return <Target {...iconProps} />;
      default:
        return <Users {...iconProps} />;
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onSelect(companion)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <Text style={styles.title}>{companion.name}</Text>
      <Text style={styles.description}>{companion.description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});