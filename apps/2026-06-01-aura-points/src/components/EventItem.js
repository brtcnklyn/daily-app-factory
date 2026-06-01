import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EventItem({ event }) {
  const isPositive = event.points >= 0;

  return (
    <View style={styles.item}>
      <Text style={styles.emoji}>{event.emoji}</Text>
      <View style={styles.content}>
        <Text style={styles.label}>{event.label}</Text>
        <Text style={styles.time}>
          {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
      <Text style={[styles.points, { color: isPositive ? '#10b981' : '#ef4444' }]}>
        {isPositive ? '+' : ''}{event.points}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#2d2d4e',
  },
  emoji: {
    fontSize: 28,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  label: {
    color: '#e5e7eb',
    fontSize: 15,
    fontWeight: '600',
  },
  time: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 2,
  },
  points: {
    fontSize: 18,
    fontWeight: '900',
  },
});
