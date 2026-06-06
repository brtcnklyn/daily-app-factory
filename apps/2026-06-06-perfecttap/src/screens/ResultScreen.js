import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Share,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DIFFICULTIES, ROUNDS, getGrade } from '../utils/scoring';

export default function ResultScreen({ route, navigation }) {
  const { scores, difficulty: diffKey } = route.params;
  const diff = DIFFICULTIES[diffKey];
  const totalScore = scores.reduce((acc, s) => acc + s.points, 0);
  const maxScore = ROUNDS * 100;
  const grade = getGrade(totalScore, maxScore);

  const perfects = scores.filter((s) => s.rating === 'PERFECT').length;
  const goods = scores.filter((s) => s.rating === 'GOOD').length;
  const misses = scores.filter((s) => s.rating === 'MISS').length;

  const gradeScale = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    saveBest();
    Animated.sequence([
      Animated.spring(gradeScale, {
        toValue: 1,
        tension: 60,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  async function saveBest() {
    try {
      const key = `best_${diffKey}`;
      const existing = await AsyncStorage.getItem(key);
      const prev = existing ? parseInt(existing, 10) : 0;
      if (totalScore > prev) {
        await AsyncStorage.setItem(key, String(totalScore));
      }
    } catch (_) {}
  }

  async function handleShare() {
    const line = scores.map((s) => (s.rating === 'PERFECT' ? '🟡' : s.rating === 'GOOD' ? '🟢' : '🔴')).join('');
    try {
      await Share.share({
        message: `PerfectTap — ${diff.label} Mode\n\n${line}\n\nGrade: ${grade.grade} (${grade.label})\nScore: ${totalScore}/${maxScore}\n\nCan you beat me?`,
      });
    } catch (_) {}
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.gradeSection, { transform: [{ scale: gradeScale }] }]}>
          <Text style={styles.gradeLabel}>YOUR GRADE</Text>
          <Text style={[styles.grade, { color: grade.color }]}>{grade.grade}</Text>
          <Text style={[styles.gradeDesc, { color: grade.color }]}>{grade.label}</Text>
        </Animated.View>

        <Animated.View style={{ opacity: contentOpacity }}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreCardLabel}>{diff.label} Mode</Text>
            <Text style={styles.totalScore}>
              {totalScore}
              <Text style={styles.maxScore}>/{maxScore}</Text>
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${(totalScore / maxScore) * 100}%`,
                    backgroundColor: grade.color,
                  },
                ]}
              />
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statCount, { color: '#FFD700' }]}>{perfects}</Text>
              <Text style={styles.statLabel}>Perfect</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statCount, { color: '#2ECC71' }]}>{goods}</Text>
              <Text style={styles.statLabel}>Good</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statCount, { color: '#E74C3C' }]}>{misses}</Text>
              <Text style={styles.statLabel}>Miss</Text>
            </View>
          </View>

          <View style={styles.tape}>
            {scores.map((s, i) => (
              <View
                key={i}
                style={[
                  styles.tapeItem,
                  { backgroundColor: s.color + '18', borderColor: s.color + '50' },
                ]}
              >
                <Text style={[styles.tapeRound, { color: s.color + '80' }]}>#{i + 1}</Text>
                <Text style={[styles.tapeRating, { color: s.color }]}>{s.rating}</Text>
                <Text style={[styles.tapePoints, { color: s.color }]}>+{s.points}</Text>
              </View>
            ))}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.playAgainBtn, { backgroundColor: diff.color }]}
              onPress={() => navigation.replace('Game', { difficulty: diffKey })}
              activeOpacity={0.85}
            >
              <Text style={styles.playAgainText}>Play Again</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareBtn} onPress={handleShare} activeOpacity={0.8}>
              <Text style={styles.shareBtnText}>Share Result</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeBtn}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.homeBtnText}>Change Difficulty</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070710' },
  scroll: { padding: 28, paddingBottom: 56 },
  gradeSection: { alignItems: 'center', paddingVertical: 28 },
  gradeLabel: {
    fontSize: 11,
    color: '#444',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  grade: { fontSize: 88, fontWeight: '900', lineHeight: 96 },
  gradeDesc: { fontSize: 18, fontWeight: '700', marginTop: 6 },
  scoreCard: {
    backgroundColor: '#0F0F20',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 14,
  },
  scoreCardLabel: { fontSize: 12, color: '#444', letterSpacing: 2, marginBottom: 8 },
  totalScore: { fontSize: 60, fontWeight: '900', color: '#FFF' },
  maxScore: { fontSize: 26, fontWeight: '400', color: '#333' },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#1A1A2E',
    borderRadius: 2,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 2 },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#0F0F20',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statDivider: { width: 1, backgroundColor: '#1A1A2E' },
  statCount: { fontSize: 32, fontWeight: '800' },
  statLabel: { fontSize: 12, color: '#444', marginTop: 4 },
  tape: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 28 },
  tapeItem: {
    flex: 1,
    minWidth: '28%',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    gap: 2,
  },
  tapeRound: { fontSize: 10, fontWeight: '600' },
  tapeRating: { fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },
  tapePoints: { fontSize: 16, fontWeight: '900' },
  actions: { gap: 12 },
  playAgainBtn: { borderRadius: 20, padding: 20, alignItems: 'center' },
  playAgainText: { fontSize: 18, fontWeight: '700', color: '#FFF' },
  shareBtn: {
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#1A1A2E',
  },
  shareBtnText: { fontSize: 16, fontWeight: '600', color: '#FFF' },
  homeBtn: { padding: 12, alignItems: 'center' },
  homeBtnText: { fontSize: 14, color: '#444' },
});
