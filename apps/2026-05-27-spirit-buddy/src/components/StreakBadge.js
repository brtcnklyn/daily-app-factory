import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StreakBadge({ streak }) {
  if (!streak || streak < 1) return null;

  return (
    <View style={styles.badge}>
      <Text style={styles.fire}>🔥</Text>
      <Text style={styles.count}>{streak}</Text>
      <Text style={styles.label}>{streak === 1 ? 'day streak' : 'day streak'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#FF9800',
  },
  fire:  { fontSize: 18 },
  count: { fontSize: 18, fontWeight: '800', color: '#FF9800', marginLeft: 5 },
  label: { fontSize: 13, color: '#FF9800', marginLeft: 4, fontWeight: '600' },
});
