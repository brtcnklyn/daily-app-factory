import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MoodBadge({ mood }) {
  if (!mood) return null;

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: mood.color + '20', borderColor: mood.color },
      ]}
    >
      <Text style={styles.emoji}>{mood.emoji}</Text>
      <Text style={[styles.label, { color: mood.color }]}>{mood.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  emoji: {
    fontSize: 16,
    marginRight: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});
