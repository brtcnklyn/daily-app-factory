import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getAuraLevel, formatPoints } from '../utils/auraData';

export default function AuraCard({ totalPoints, todayPoints }) {
  const level = getAuraLevel(totalPoints);

  return (
    <View style={styles.card}>
      <Text style={styles.levelLabel}>{level.label}</Text>
      <Text style={[styles.points, { color: level.color }]}>{formatPoints(totalPoints)}</Text>
      <Text style={styles.pointsLabel}>Total Aura Points</Text>
      {todayPoints !== undefined && (
        <View style={styles.todayBadge}>
          <Text style={[styles.todayText, { color: todayPoints >= 0 ? '#10b981' : '#ef4444' }]}>
            {todayPoints >= 0 ? '+' : ''}{todayPoints} today
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#2d2d4e',
  },
  levelLabel: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  points: {
    fontSize: 72,
    fontWeight: '900',
    letterSpacing: -2,
  },
  pointsLabel: {
    color: '#4b5563',
    fontSize: 13,
    marginTop: 4,
  },
  todayBadge: {
    marginTop: 14,
    backgroundColor: '#0f172a',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 7,
  },
  todayText: {
    fontSize: 15,
    fontWeight: '800',
  },
});
