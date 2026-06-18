import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const STATS_KEY = '@daily_duel_stats';

export default function HomeScreen({ navigation }) {
  const [stats, setStats] = useState({ played: 0, won: 0, streak: 0 });
  const [todayPlayed, setTodayPlayed] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [])
  );

  const loadStats = async () => {
    try {
      const raw = await AsyncStorage.getItem(STATS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setStats(parsed);
        setTodayPlayed(parsed.lastPlayed === new Date().toDateString());
      }
    } catch {}
  };

  const winRate = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      <View style={styles.header}>
        <Text style={styles.title}>DAILY</Text>
        <Text style={styles.titleRed}>DUEL</Text>
        <Text style={styles.subtitle}>Guess the word · 6 tries · new word every day</Text>
      </View>

      <View style={styles.statsRow}>
        <StatBox label="Played"  value={stats.played} />
        <StatBox label="Win %"   value={`${winRate}%`} />
        <StatBox label="Streak"  value={stats.streak} />
      </View>

      <View style={styles.center}>
        {todayPlayed ? (
          <View style={styles.doneCard}>
            <Text style={styles.doneIcon}>✓</Text>
            <Text style={styles.doneTitle}>Already played today!</Text>
            <Text style={styles.doneSub}>Come back tomorrow for a new word.</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.playBtn}
            onPress={() => navigation.navigate('Game')}
            activeOpacity={0.85}
          >
            <Text style={styles.playBtnText}>PLAY TODAY'S DUEL</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.legend}>
        <LegendRow color="#538d4e" label="Correct letter, correct spot" />
        <LegendRow color="#b59f3b" label="Correct letter, wrong spot" />
        <LegendRow color="#3a3a3c" label="Letter not in the word" />
      </View>
    </SafeAreaView>
  );
}

function StatBox({ label, value }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function LegendRow({ color, label }) {
  return (
    <View style={styles.legendRow}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#1a1a2e' },
  header:      { alignItems: 'center', paddingTop: 36, paddingBottom: 12 },
  title:       { fontSize: 52, fontWeight: '900', color: '#ffffff', letterSpacing: 10 },
  titleRed:    { fontSize: 52, fontWeight: '900', color: '#e94560', letterSpacing: 10, marginTop: -8 },
  subtitle:    { color: '#666688', marginTop: 10, fontSize: 12, letterSpacing: 0.5 },

  statsRow:    { flexDirection: 'row', justifyContent: 'center', marginVertical: 28 },
  statBox:     {
    alignItems: 'center', backgroundColor: '#16213e',
    borderRadius: 14, padding: 16, minWidth: 88, marginHorizontal: 8,
  },
  statValue:   { fontSize: 30, fontWeight: '800', color: '#ffffff' },
  statLabel:   { fontSize: 11, color: '#666688', marginTop: 4, letterSpacing: 0.5 },

  center:      { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  playBtn:     {
    backgroundColor: '#e94560',
    paddingVertical: 18, paddingHorizontal: 48,
    borderRadius: 50,
    shadowColor: '#e94560', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45, shadowRadius: 12, elevation: 8,
  },
  playBtnText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 2 },

  doneCard:    { alignItems: 'center', backgroundColor: '#16213e', borderRadius: 20, padding: 32, width: '100%' },
  doneIcon:    { fontSize: 52, marginBottom: 10 },
  doneTitle:   { fontSize: 20, fontWeight: '700', color: '#4ecca3', marginBottom: 6 },
  doneSub:     { color: '#666688', fontSize: 14 },

  legend:      { paddingHorizontal: 28, paddingBottom: 28 },
  legendRow:   { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  legendDot:   { width: 18, height: 18, borderRadius: 4, marginRight: 10 },
  legendText:  { color: '#555577', fontSize: 13 },
});
