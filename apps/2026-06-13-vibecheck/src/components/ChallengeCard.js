import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChallengeCard({ challenge }) {
  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>{challenge.emoji}</Text>
      <Text style={styles.title}>{challenge.title}</Text>
      <Text style={styles.description}>{challenge.description}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>⏱ {challenge.duration}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 6,
  },
  emoji: { fontSize: 64 },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A2E',
    marginTop: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
  },
  badge: {
    marginTop: 18,
    backgroundColor: '#F0EFFF',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 20,
  },
  badgeText: { color: '#6C63FF', fontWeight: '700', fontSize: 13 },
});
