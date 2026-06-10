import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StreakBadge({ streak }) {
  if (!streak || streak < 1) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.fire}>🔥</Text>
      <Text style={styles.count}>{streak}</Text>
      <Text style={styles.label}>day streak</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  fire: {
    fontSize: 20,
  },
  count: {
    color: '#F59E0B',
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    color: '#94A3B8',
    fontSize: 14,
  },
});
