import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExerciseCard({ exercise, completed = false, active = false }) {
  return (
    <View style={[styles.card, active && styles.cardActive, completed && styles.cardDone]}>
      <Text style={styles.emoji}>{exercise.emoji}</Text>
      <View style={styles.info}>
        <Text style={[styles.name, completed && styles.nameDone]}>{exercise.name}</Text>
        <Text style={styles.reps}>{exercise.reps}</Text>
        <Text style={styles.muscle}>{exercise.muscle}</Text>
      </View>
      {completed && <Text style={styles.check}>✓</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1C1C2E',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#2D2D4E',
  },
  cardActive: { borderColor: '#FF4500', borderWidth: 2 },
  cardDone: { borderColor: '#10B98144', opacity: 0.65 },
  emoji: { fontSize: 32 },
  info: { flex: 1 },
  name: { color: '#F9FAFB', fontSize: 17, fontWeight: '700' },
  nameDone: { textDecorationLine: 'line-through', color: '#6B7280' },
  reps: { color: '#FF4500', fontSize: 13, fontWeight: '600', marginTop: 3 },
  muscle: { color: '#4B5563', fontSize: 12, marginTop: 2 },
  check: { color: '#10B981', fontSize: 22, fontWeight: '900' },
});
