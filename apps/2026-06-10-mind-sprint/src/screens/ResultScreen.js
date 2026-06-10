import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { saveScore } from '../utils/storage';

function getRank(score) {
  if (score >= 1400) return { label: 'GENIUS', color: '#F59E0B', emoji: '🧠' };
  if (score >= 1100) return { label: 'EXPERT', color: '#7C3AED', emoji: '⚡' };
  if (score >= 800)  return { label: 'PRO',    color: '#06B6D4', emoji: '🎯' };
  if (score >= 500)  return { label: 'LEARNER',color: '#10B981', emoji: '📈' };
  return              { label: 'STARTER', color: '#94A3B8', emoji: '🌱' };
}

export default function ResultScreen({ navigation, route }) {
  const { score, results } = route.params;
  const [saved, setSaved] = useState(null);
  const rank = getRank(score);

  useEffect(() => {
    saveScore(score).then(setSaved);
  }, []);

  const correct = results.filter(r => r.correct).length;
  const accuracy = Math.round((correct / results.length) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          {saved?.isNewRecord && (
            <View style={styles.recordBadge}>
              <Text style={styles.recordText}>NEW RECORD</Text>
            </View>
          )}
          <Text style={styles.rankEmoji}>{rank.emoji}</Text>
          <Text style={[styles.rankLabel, { color: rank.color }]}>{rank.label}</Text>
          <Text style={styles.scoreNum}>{score}</Text>
          <Text style={styles.scoreUnit}>points</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{correct}/{results.length}</Text>
            <Text style={styles.statLabel}>Correct</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{accuracy}%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
          {saved && (
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{saved.streak}</Text>
              <Text style={styles.statLabel}>Streak 🔥</Text>
            </View>
          )}
        </View>

        <View style={styles.breakdown}>
          <Text style={styles.breakdownTitle}>QUESTION BREAKDOWN</Text>
          {results.map((r, i) => (
            <View key={i} style={styles.resultRow}>
              <Text style={styles.qNum}>{i + 1}.</Text>
              <Text style={styles.qText}>{r.question.text}</Text>
              <View style={styles.resultRight}>
                <Text style={r.correct ? styles.ptsCorrect : styles.ptsWrong}>
                  {r.correct ? `+${r.pts}` : '0'}
                </Text>
                <Text style={r.correct ? styles.check : styles.cross}>
                  {r.correct ? '✓' : '✗'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.playAgainBtn}
          onPress={() => navigation.replace('Game')}
          activeOpacity={0.85}
        >
          <Text style={styles.playAgainText}>Play Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.homeText}>Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A1A' },
  content: { padding: 24, paddingBottom: 48 },
  hero: { alignItems: 'center', paddingTop: 16, marginBottom: 28 },
  recordBadge: {
    backgroundColor: '#78350F',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 12,
  },
  recordText: { color: '#FCD34D', fontSize: 12, fontWeight: '800', letterSpacing: 2 },
  rankEmoji: { fontSize: 48, marginBottom: 6 },
  rankLabel: { fontSize: 16, fontWeight: '800', letterSpacing: 3, marginBottom: 8 },
  scoreNum: { fontSize: 88, fontWeight: 'bold', color: '#F8FAFC', lineHeight: 92 },
  scoreUnit: { color: '#4B5563', fontSize: 16, marginTop: -4 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 28 },
  statBox: {
    flex: 1,
    backgroundColor: '#111132',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E1B4B',
  },
  statNum: { color: '#7C3AED', fontSize: 24, fontWeight: 'bold' },
  statLabel: { color: '#4B5563', fontSize: 12, marginTop: 2 },
  breakdown: { marginBottom: 28 },
  breakdownTitle: {
    color: '#4B5563',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 12,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#111132',
    gap: 8,
  },
  qNum: { color: '#4B5563', fontSize: 13, width: 20 },
  qText: { color: '#94A3B8', fontSize: 14, flex: 1 },
  resultRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ptsCorrect: { color: '#10B981', fontSize: 13, fontWeight: 'bold', minWidth: 36, textAlign: 'right' },
  ptsWrong: { color: '#EF4444', fontSize: 13, minWidth: 36, textAlign: 'right' },
  check: { color: '#10B981', fontSize: 16, fontWeight: 'bold' },
  cross: { color: '#EF4444', fontSize: 16, fontWeight: 'bold' },
  playAgainBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#7C3AED',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  playAgainText: { color: '#F8FAFC', fontSize: 16, fontWeight: 'bold' },
  homeBtn: {
    backgroundColor: '#111132',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E1B4B',
  },
  homeText: { color: '#64748B', fontSize: 15, fontWeight: '600' },
});
