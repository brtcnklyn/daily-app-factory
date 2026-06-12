import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import {
  getEntries,
  calculateStreak,
  calculateLongestStreak,
} from '../utils/storage';
import { getAuraColor, getAuraLabel } from '../components/AuraDisplay';

const VIBE_LABELS = {
  productive: '🔥 Productive',
  main_character: '💫 Main Character',
  chaotic: '🌀 Chaotic',
  low_battery: '😴 Low Battery',
  glowing_up: '✨ Glowing Up',
  sigma: '😎 Sigma Mode',
  cozy: '🌸 Cozy Era',
  villain: '🖤 Villain Arc',
};

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function StatCard({ label, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>{label}</Text>
      {children}
    </View>
  );
}

export default function StatsScreen() {
  const [stats, setStats] = useState(null);

  useFocusEffect(
    useCallback(() => {
      computeStats();
    }, [])
  );

  async function computeStats() {
    const entries = await getEntries();
    const values = Object.values(entries);

    if (values.length === 0) {
      setStats(null);
      return;
    }

    const scores = values.map((e) => e.score);
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    const highestEntry = values.find((e) => e.score === highest);

    const vibeCounts = {};
    values.forEach((e) => {
      (e.vibes || []).forEach((v) => {
        vibeCounts[v] = (vibeCounts[v] || 0) + 1;
      });
    });
    const topVibeEntry = Object.entries(vibeCounts).sort(
      (a, b) => b[1] - a[1]
    )[0];

    setStats({
      total: values.length,
      average: avg,
      highest,
      lowest,
      highestDate: highestEntry?.date,
      currentStreak: calculateStreak(entries),
      longestStreak: calculateLongestStreak(entries),
      topVibe: topVibeEntry
        ? { id: topVibeEntry[0], count: topVibeEntry[1] }
        : null,
    });
  }

  if (!stats) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>📊</Text>
        <Text style={styles.emptyTitle}>No data yet</Text>
        <Text style={styles.emptyText}>
          Check in daily to see your aura statistics
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.streakRow}>
        <View style={[styles.streakCard, styles.streakCardLeft]}>
          <Text style={styles.streakValue}>🔥 {stats.currentStreak}</Text>
          <Text style={styles.streakCardSub}>Current Streak</Text>
        </View>
        <View style={styles.streakCard}>
          <Text style={styles.streakValue}>⚡ {stats.longestStreak}</Text>
          <Text style={styles.streakCardSub}>Best Streak</Text>
        </View>
      </View>

      <StatCard label="AVERAGE AURA">
        <Text style={[styles.bigNum, { color: getAuraColor(stats.average) }]}>
          {stats.average}
        </Text>
        <Text style={[styles.cardSub, { color: getAuraColor(stats.average) }]}>
          {getAuraLabel(stats.average)}
        </Text>
      </StatCard>

      <StatCard label="PEAK AURA">
        <Text style={[styles.bigNum, { color: getAuraColor(stats.highest) }]}>
          {stats.highest}
        </Text>
        <Text style={styles.cardSub}>{formatDate(stats.highestDate)}</Text>
      </StatCard>

      <View style={styles.miniRow}>
        <View style={[styles.miniCard, styles.miniCardLeft]}>
          <Text style={styles.miniLabel}>TOTAL CHECK-INS</Text>
          <Text style={[styles.miniNum, { color: '#A78BFA' }]}>
            {stats.total}
          </Text>
        </View>
        <View style={styles.miniCard}>
          <Text style={styles.miniLabel}>LOWEST AURA</Text>
          <Text style={[styles.miniNum, { color: getAuraColor(stats.lowest) }]}>
            {stats.lowest}
          </Text>
        </View>
      </View>

      {stats.topVibe && (
        <StatCard label="TOP VIBE">
          <Text style={styles.vibeDisplay}>
            {VIBE_LABELS[stats.topVibe.id] || stats.topVibe.id}
          </Text>
          <Text style={styles.cardSub}>
            selected {stats.topVibe.count}
            {stats.topVibe.count === 1 ? ' time' : ' times'}
          </Text>
        </StatCard>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D1A' },
  content: { padding: 16, paddingBottom: 40 },
  empty: {
    flex: 1,
    backgroundColor: '#0D0D1A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyEmoji: { fontSize: 52, marginBottom: 16 },
  emptyTitle: {
    color: '#E2E2FF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptyText: { color: '#5555AA', fontSize: 15, textAlign: 'center' },
  streakRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  streakCard: {
    flex: 1,
    backgroundColor: '#12122A',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
  },
  streakCardLeft: { marginRight: 8 },
  streakValue: { fontSize: 28, fontWeight: '800', color: '#FBBF24', marginBottom: 4 },
  streakCardSub: { color: '#5555AA', fontSize: 13 },
  card: {
    backgroundColor: '#12122A',
    borderRadius: 14,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  cardLabel: {
    color: '#5555AA',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  bigNum: { fontSize: 52, fontWeight: '800', marginBottom: 4 },
  cardSub: { color: '#5555AA', fontSize: 14 },
  miniRow: { flexDirection: 'row', marginBottom: 12 },
  miniCard: {
    flex: 1,
    backgroundColor: '#12122A',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
  },
  miniCardLeft: { marginRight: 8 },
  miniLabel: {
    color: '#5555AA',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 10,
    textAlign: 'center',
  },
  miniNum: { fontSize: 36, fontWeight: '800' },
  vibeDisplay: { fontSize: 22, marginBottom: 6 },
});
