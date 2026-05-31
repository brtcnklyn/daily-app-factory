import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import { saveResult } from '../utils/storage';

export default function ResultScreen({ route, navigation }) {
  const { score, total, timeUsed } = route.params;
  const [saved, setSaved] = useState(null);
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, tension: 60, friction: 7, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
    persistResult();
  }, []);

  const persistResult = async () => {
    const result = await saveResult(score);
    setSaved(result);
  };

  const percentage = Math.round((score / total) * 100);

  const getGrade = () => {
    if (score === total) return { emoji: '🏆', text: 'Perfect!', color: '#FFD700' };
    if (score >= 8) return { emoji: '⚡', text: 'Excellent!', color: '#00C896' };
    if (score >= 6) return { emoji: '🎯', text: 'Good Job!', color: '#4ECDC4' };
    if (score >= 4) return { emoji: '📚', text: 'Keep Going!', color: '#A8DADC' };
    return { emoji: '💪', text: 'Try Again!', color: '#FF6B6B' };
  };

  const grade = getGrade();

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Animated.View style={[styles.scoreCircle, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.scoreEmoji}>{grade.emoji}</Text>
          <Text style={styles.scoreNumber}>{score}/{total}</Text>
          <Text style={styles.scorePercent}>{percentage}%</Text>
        </Animated.View>

        <Text style={[styles.gradeText, { color: grade.color }]}>{grade.text}</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{timeUsed}s</Text>
            <Text style={styles.statLabel}>Time Used</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{total - score}</Text>
            <Text style={styles.statLabel}>Missed</Text>
          </View>
          {saved && (
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{saved.newHighScore}/10</Text>
              <Text style={styles.statLabel}>Best Score</Text>
            </View>
          )}
        </View>

        {saved?.isNewRecord && (
          <View style={styles.newRecordBadge}>
            <Text style={styles.newRecordText}>🎉 New Personal Best!</Text>
          </View>
        )}

        {saved && (
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>🔥 {saved.newStreak} day streak</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.replace('Quiz')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>Play Again ⚡</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A2E' },
  content: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  scoreCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#16213E',
    borderWidth: 3,
    borderColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#6C63FF',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  scoreEmoji: { fontSize: 40, marginBottom: 2 },
  scoreNumber: { fontSize: 32, fontWeight: '800', color: '#FFFFFF' },
  scorePercent: { fontSize: 14, color: '#A8ADCF', fontWeight: '600' },
  gradeText: { fontSize: 28, fontWeight: '800', marginBottom: 24 },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    width: '100%',
    justifyContent: 'center',
  },
  statItem: {
    backgroundColor: '#16213E',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    minWidth: 90,
  },
  statValue: { fontSize: 20, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 },
  statLabel: { fontSize: 11, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 0.5 },
  newRecordBadge: {
    backgroundColor: '#2D1B00',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  newRecordText: { color: '#FFD700', fontWeight: '700', fontSize: 15 },
  streakBadge: {
    backgroundColor: '#1C0D00',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 24,
  },
  streakText: { color: '#FF9F43', fontWeight: '700', fontSize: 15 },
  primaryButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 48,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  primaryButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  secondaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: { color: '#A8ADCF', fontSize: 16, fontWeight: '600' },
});
