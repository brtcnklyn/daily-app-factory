import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getStreak, getTodayScore, getBestWPM } from '../utils/storage';
import { getGrade } from '../utils/texts';

export default function HomeScreen({ navigation }) {
  const [streak, setStreak] = useState(0);
  const [todayScore, setTodayScore] = useState(null);
  const [bestWPM, setBestWPM] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const [s, today, best] = await Promise.all([
          getStreak(),
          getTodayScore(),
          getBestWPM(),
        ]);
        setStreak(s);
        setTodayScore(today);
        setBestWPM(best);
      };
      load();
    }, [])
  );

  const todayGrade = todayScore ? getGrade(todayScore.wpm) : null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.logo}>⌨️</Text>
        <Text style={styles.title}>TypeRush</Text>
        <Text style={styles.subtitle}>Daily Speed Typing Challenge</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statEmoji}>🔥</Text>
          <Text style={styles.statValue}>{streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statEmoji}>⚡</Text>
          <Text style={styles.statValue}>{bestWPM}</Text>
          <Text style={styles.statLabel}>Best WPM</Text>
        </View>
      </View>

      {todayScore ? (
        <View style={[styles.todayCard, { borderColor: todayGrade.color }]}>
          <Text style={styles.todayTag}>TODAY'S RESULT</Text>
          <View style={[styles.gradePill, { backgroundColor: todayGrade.color }]}>
            <Text style={styles.gradePillText}>
              {todayGrade.grade} — {todayGrade.label}
            </Text>
          </View>
          <Text style={styles.todayWPM}>{todayScore.wpm} WPM</Text>
          <Text style={styles.todayAccuracy}>{todayScore.accuracy}% accuracy</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.navigate('Play')}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.ctaSection}>
          <Text style={styles.ctaText}>Ready for today's challenge?</Text>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => navigation.navigate('Play')}
          >
            <Text style={styles.playButtonText}>⌨️  Start Typing</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Pro Tips</Text>
        <Text style={styles.tipItem}>• Read ahead — eyes should be 2 words ahead of fingers</Text>
        <Text style={styles.tipItem}>• Use all fingers, keep hands on the home row</Text>
        <Text style={styles.tipItem}>• Accuracy first — speed follows naturally with practice</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F3FF' },
  content: { padding: 20 },
  header: { alignItems: 'center', marginBottom: 28 },
  logo: { fontSize: 48 },
  title: { fontSize: 36, fontWeight: '900', color: '#7C3AED', letterSpacing: -1, marginTop: 8 },
  subtitle: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  statEmoji: { fontSize: 28, marginBottom: 6 },
  statValue: { fontSize: 28, fontWeight: '800', color: '#1F2937' },
  statLabel: { fontSize: 12, color: '#6B7280', marginTop: 3, fontWeight: '500' },
  todayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 22,
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  todayTag: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  gradePill: {
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 6,
    marginBottom: 14,
  },
  gradePillText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  todayWPM: { fontSize: 44, fontWeight: '900', color: '#1F2937' },
  todayAccuracy: { fontSize: 15, color: '#6B7280', marginTop: 4 },
  retryButton: {
    marginTop: 14,
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  retryButtonText: { color: '#7C3AED', fontWeight: '700' },
  ctaSection: { alignItems: 'center', marginBottom: 24 },
  ctaText: { fontSize: 16, color: '#374151', marginBottom: 16, fontWeight: '500' },
  playButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 16,
    paddingHorizontal: 44,
    paddingVertical: 16,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },
  playButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  tipsCard: {
    backgroundColor: '#EDE9FE',
    borderRadius: 16,
    padding: 18,
  },
  tipsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#5B21B6',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tipItem: { fontSize: 13, color: '#6D28D9', lineHeight: 24 },
});
