import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StreakBadge({ streak }) {
  if (streak === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.fire}>🔥</Text>
      <Text style={styles.count}>{streak}</Text>
      <Text style={styles.label}>{streak === 1 ? 'day streak' : 'day streak'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    marginBottom: 8,
  },
  fire: {
    fontSize: 20,
    marginRight: 6,
  },
  count: {
    fontSize: 20,
    fontWeight: '800',
    color: '#EA580C',
    marginRight: 4,
  },
  label: {
    fontSize: 14,
    color: '#EA580C',
    fontWeight: '600',
  },
});
