import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ActivityIndicator, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import StreakBadge from '../components/StreakBadge';
import { getStats } from '../utils/storage';

export default function HomeScreen({ navigation }) {
  const [stats, setStats] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getStats().then(setStats);
    }, [])
  );

  if (!stats) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator color="#7C3AED" size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Mind Sprint</Text>
          <Text style={styles.subtitle}>Daily Brain Training</Text>
        </View>

        {stats.streak > 0 && (
          <View style={styles.streakRow}>
            <StreakBadge streak={stats.streak} />
          </View>
        )}

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.highScore}</Text>
            <Text style={styles.statLabel}>High Score</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: stats.hasPlayedToday ? '#10B981' : '#4B5563' }]}>
              {stats.hasPlayedToday ? stats.todayScore : '—'}
            </Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>
        </View>

        {stats.hasPlayedToday ? (
          <View style={styles.ctaSection}>
            <View style={styles.doneCard}>
              <Text style={styles.doneEmoji}>✓</Text>
              <Text style={styles.doneText}>Today's sprint complete!</Text>
              <Text style={styles.doneScore}>{stats.todayScore} pts</Text>
            </View>
            <TouchableOpacity
              style={styles.playAgainBtn}
              onPress={() => navigation.navigate('Game')}
            >
              <Text style={styles.playAgainText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.playBtn}
            onPress={() => navigation.navigate('Game')}
            activeOpacity={0.85}
          >
            <Text style={styles.playBtnText}>Start Today's Sprint</Text>
          </TouchableOpacity>
        )}

        <View style={styles.howCard}>
          <Text style={styles.howTitle}>HOW TO PLAY</Text>
          <View style={styles.howRow}>
            <Text style={styles.howIcon}>🧮</Text>
            <Text style={styles.howText}>10 math questions, 5 seconds each</Text>
          </View>
          <View style={styles.howRow}>
            <Text style={styles.howIcon}>⚡</Text>
            <Text style={styles.howText}>Speed bonus: up to +50 pts per question</Text>
          </View>
          <View style={styles.howRow}>
            <Text style={styles.howIcon}>🏆</Text>
            <Text style={styles.howText}>Max score: 1500 pts — aim for Genius rank</Text>
          </View>
        </View>

        <View style={styles.ranksCard}>
          <Text style={styles.howTitle}>RANKS</Text>
          {[
            { label: 'Genius', range: '1400+', color: '#F59E0B' },
            { label: 'Expert', range: '1100–1399', color: '#7C3AED' },
            { label: 'Pro', range: '800–1099', color: '#06B6D4' },
            { label: 'Learner', range: '500–799', color: '#10B981' },
            { label: 'Starter', range: '0–499', color: '#64748B' },
          ].map(r => (
            <View key={r.label} style={styles.rankRow}>
              <Text style={[styles.rankLabel, { color: r.color }]}>{r.label}</Text>
              <Text style={styles.rankRange}>{r.range}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A1A' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 28 },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#F8FAFC',
    letterSpacing: -1.5,
  },
  subtitle: { fontSize: 16, color: '#64748B', marginTop: 4 },
  streakRow: { alignItems: 'center', marginBottom: 24 },
  statsGrid: { flexDirection: 'row', gap: 14, marginBottom: 28 },
  statCard: {
    flex: 1,
    backgroundColor: '#111132',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E1B4B',
  },
  statValue: { fontSize: 34, fontWeight: 'bold', color: '#7C3AED' },
  statLabel: {
    fontSize: 11,
    color: '#4B5563',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  ctaSection: { marginBottom: 28 },
  doneCard: {
    backgroundColor: '#052E16',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#065F46',
  },
  doneEmoji: { fontSize: 28, marginBottom: 4 },
  doneText: { color: '#6EE7B7', fontSize: 15 },
  doneScore: { color: '#10B981', fontSize: 24, fontWeight: 'bold', marginTop: 4 },
  playAgainBtn: {
    borderWidth: 1,
    borderColor: '#7C3AED',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  playAgainText: { color: '#A78BFA', fontSize: 16, fontWeight: '600' },
  playBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#7C3AED',
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  playBtnText: { color: '#F8FAFC', fontSize: 18, fontWeight: 'bold' },
  howCard: {
    backgroundColor: '#0D0D2A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1E1B4B',
    gap: 10,
  },
  howTitle: {
    color: '#4B5563',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 4,
  },
  howRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  howIcon: { fontSize: 18, width: 28 },
  howText: { color: '#64748B', fontSize: 14, flex: 1, lineHeight: 20 },
  ranksCard: {
    backgroundColor: '#0D0D2A',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1E1B4B',
    gap: 8,
  },
  rankRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rankLabel: { fontSize: 15, fontWeight: '700' },
  rankRange: { color: '#4B5563', fontSize: 13 },
});
