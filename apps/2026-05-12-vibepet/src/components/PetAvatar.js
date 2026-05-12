import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PET_STAGES = [
  { emoji: '🥚', name: 'Egg', hint: 'Start your streak to hatch me!', minStreak: 0 },
  { emoji: '🐣', name: 'Hatchling', hint: "Keep going, I'm waking up!", minStreak: 1 },
  { emoji: '🐥', name: 'Chick', hint: 'Growing stronger each day!', minStreak: 4 },
  { emoji: '🐓', name: 'Rooster', hint: "You're on fire! Keep it up!", minStreak: 8 },
  { emoji: '🦋', name: 'Butterfly', hint: 'Transformation complete!', minStreak: 15 },
];

export default function PetAvatar({ streak = 0 }) {
  const stage =
    [...PET_STAGES].reverse().find((s) => streak >= s.minStreak) || PET_STAGES[0];

  return (
    <View style={styles.container}>
      <View style={styles.petCircle}>
        <Text style={styles.petEmoji}>{stage.emoji}</Text>
      </View>
      <Text style={styles.petName}>{stage.name}</Text>
      <Text style={styles.hint}>{stage.hint}</Text>
      {streak > 0 && (
        <View style={styles.streakBadge}>
          <Text style={styles.streakText}>
            🔥 {streak} day{streak !== 1 ? 's' : ''}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  petCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#F0EDFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  petEmoji: {
    fontSize: 64,
  },
  petName: {
    marginTop: 14,
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  hint: {
    marginTop: 4,
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  streakBadge: {
    marginTop: 14,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 20,
  },
  streakText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
