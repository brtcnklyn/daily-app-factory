import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getScores, getBestWPM, getStreak } from '../utils/storage';
import { getGrade } from '../utils/texts';

export default function StatsScreen() {
  const [scores, setScores] = useState([]);
  const [bestWPM, setBestWPM] = useState(0);
  const [streak, setStreak] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const [s, best, str] = await Promise.all([
          getScores(),
          getBestWPM(),
          getStreak(),
        ]);
        setScores(s);
        setBestWPM(best);
        setStreak(str);
      };
      load();
    }, [])
  );

  const avgWPM =
    scores.length > 0
      ? Math.round(scores.reduce((sum, s) => sum + s.wpm, 0) / scores.length)
      : 0;

  const last7 = scores.slice(0, 7).reverse();
  const maxWPM = Math.max(...last7.map((s) => s.wpm), 1);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.summaryRow}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryEmoji}>⚡</Text>
          <Text style={styles.summaryValue}>{bestWPM}</Text>
          <Text style={styles.summaryLabel}>Best WPM</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryEmoji}>📊</Text>
          <Text style={styles.summaryValue}>{avgWPM}</Text>
          <Text style={styles.summaryLabel}>Avg WPM</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryEmoji}>🔥</Text>
          <Text style={styles.summaryValue}>{streak}</Text>
          <Text style={styles.summaryLabel}>Streak</Text>
        </View>
      </View>

      {last7.length > 0 && (
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Last 7 Sessions</Text>
          <View style={styles.chart}>
            {last7.map((score) => {
              const grade = getGrade(score.wpm);
              const day = new Date(score.date + 'T12:00:00').toLocaleDateString('en', {
                weekday: 'short',
              });
              return (
                <View key={score.id} style={styles.barCol}>
                  <Text style={styles.barWPM}>{score.wpm}</Text>
                  <View style={styles.barWrapper}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: Math.max((score.wpm / maxWPM) * 80, 4),
                          backgroundColor: grade.color,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.barDay}>{day.slice(0, 2)}</Text>
                </View>
              );
            })}
          </View>
        </View>
      )}

      {scores.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>⌨️</Text>
          <Text style={styles.emptyTitle}>No sessions yet</Text>
          <Text style={styles.emptySubtitle}>Complete your first challenge to see stats!</Text>
        </View>
      ) : (
        <View style={styles.historyCard}>
          <Text style={styles.historyTitle}>All Sessions</Text>
          {scores.map((score) => {
            const grade = getGrade(score.wpm);
            const date = new Date(score.date + 'T12:00:00');
            const formatted = date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            });
            return (
              <View key={score.id} style={styles.historyRow}>
                <View style={[styles.gradeDot, { backgroundColor: grade.color }]}>
                  <Text style={styles.gradeDotText}>{grade.grade}</Text>
                </View>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyWPM}>{score.wpm} WPM</Text>
                  <Text style={styles.historyAcc}>{score.accuracy}% accuracy</Text>
                </View>
                <Text style={styles.historyDate}>{formatted}</Text>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F3FF' },
  content: { padding: 16, paddingBottom: 32 },
  summaryRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  summaryBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryEmoji: { fontSize: 22, marginBottom: 4 },
  summaryValue: { fontSize: 24, fontWeight: '800', color: '#1F2937' },
  summaryLabel: { fontSize: 11, color: '#9CA3AF', fontWeight: '500', marginTop: 2 },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 16,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
  },
  barCol: { alignItems: 'center', flex: 1 },
  barWPM: { fontSize: 9, color: '#9CA3AF', fontWeight: '600', marginBottom: 4 },
  barWrapper: { height: 80, justifyContent: 'flex-end', width: '100%', alignItems: 'center' },
  bar: { width: '65%', borderRadius: 4 },
  barDay: { fontSize: 10, color: '#9CA3AF', marginTop: 4 },
  empty: { alignItems: 'center', paddingVertical: 48 },
  emptyEmoji: { fontSize: 56 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#1F2937', marginTop: 12 },
  emptySubtitle: { fontSize: 14, color: '#6B7280', marginTop: 6, textAlign: 'center' },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  historyTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  gradeDot: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  gradeDotText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
  historyInfo: { flex: 1 },
  historyWPM: { fontSize: 15, fontWeight: '700', color: '#1F2937' },
  historyAcc: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  historyDate: { fontSize: 13, color: '#6B7280', fontWeight: '500' },
});
