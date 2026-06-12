import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { getEntries } from '../utils/storage';
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
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function EntryCard({ item }) {
  const color = getAuraColor(item.score);
  const vibeDisplay = (item.vibes || [])
    .map((id) => VIBE_LABELS[id] || id)
    .join('  ');

  return (
    <View style={styles.card}>
      <View
        style={[
          styles.scorePill,
          { backgroundColor: color + '18', borderColor: color + '44' },
        ]}
      >
        <Text style={[styles.scoreText, { color }]}>{item.score}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardDate}>{formatDate(item.date)}</Text>
        <Text style={[styles.cardLabel, { color }]}>{getAuraLabel(item.score)}</Text>
        {vibeDisplay.length > 0 && (
          <Text style={styles.vibesLine} numberOfLines={1}>
            {vibeDisplay}
          </Text>
        )}
      </View>
    </View>
  );
}

export default function HistoryScreen() {
  const [entries, setEntries] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadEntries();
    }, [])
  );

  async function loadEntries() {
    const data = await getEntries();
    const sorted = Object.values(data).sort((a, b) =>
      b.date.localeCompare(a.date)
    );
    setEntries(sorted);
  }

  if (entries.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>🌑</Text>
        <Text style={styles.emptyTitle}>No check-ins yet</Text>
        <Text style={styles.emptyText}>
          Go to Today and log your first aura score
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={entries}
      keyExtractor={(item) => item.date}
      renderItem={({ item }) => <EntryCard item={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12122A',
    borderRadius: 14,
    padding: 16,
  },
  scorePill: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginRight: 16,
  },
  scoreText: { fontSize: 20, fontWeight: '800' },
  cardBody: { flex: 1 },
  cardDate: {
    color: '#E2E2FF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  cardLabel: { fontSize: 13, fontWeight: '600', marginBottom: 4 },
  vibesLine: { color: '#5555AA', fontSize: 12 },
  separator: { height: 8 },
});
