import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getStats } from '../utils/storage';

export default function HomeScreen({ navigation }) {
  const [stats, setStats] = useState({ highScore: 0, streak: 0, totalGames: 0 });
  const [playedToday, setPlayedToday] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [])
  );

  const loadStats = async () => {
    const s = await getStats();
    setStats(s);
    const today = new Date().toISOString().split('T')[0];
    setPlayedToday(s.lastPlayed === today);
  };

  const getRankLabel = (score) => {
    if (score === 10) return { label: '🏆 Legend', color: '#FFD700' };
    if (score >= 8) return { label: '⚡ Expert', color: '#00C896' };
    if (score >= 6) return { label: '🎯 Sharp', color: '#4ECDC4' };
    if (score >= 4) return { label: '📚 Learning', color: '#A8DADC' };
    return { label: '🌱 Beginner', color: '#95A5A6' };
  };

  const rank = getRankLabel(stats.highScore);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.heroEmoji}>⚡</Text>
        <Text style={styles.heroTitle}>BrainBurst</Text>
        <Text style={styles.heroSub}>60 seconds. 10 questions. How sharp is your brain?</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.highScore}/10</Text>
          <Text style={styles.statLabel}>Best Score</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>🔥 {stats.streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.totalGames}</Text>
          <Text style={styles.statLabel}>Games</Text>
        </View>
      </View>

      {stats.highScore > 0 && (
        <View style={[styles.rankBadge, { borderColor: rank.color }]}>
          <Text style={[styles.rankText, { color: rank.color }]}>{rank.label}</Text>
          <Text style={styles.rankSub}>Current Rank</Text>
        </View>
      )}

      {playedToday && (
        <View style={styles.todayBadge}>
          <Text style={styles.todayText}>✅ You played today — keep the streak alive!</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('Quiz')}
        activeOpacity={0.85}
      >
        <Text style={styles.startButtonText}>
          {stats.totalGames === 0 ? 'Start Quiz ⚡' : 'Play Again ⚡'}
        </Text>
      </TouchableOpacity>

      <View style={styles.rulesCard}>
        <Text style={styles.rulesTitle}>How to play</Text>
        <Text style={styles.rulesText}>• 10 random trivia questions</Text>
        <Text style={styles.rulesText}>• 60 seconds on the clock</Text>
        <Text style={styles.rulesText}>• Tap the correct answer</Text>
        <Text style={styles.rulesText}>• Beat your high score, build your streak</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A2E' },
  content: { padding: 20, paddingBottom: 40 },
  heroCard: {
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 20,
  },
  heroEmoji: { fontSize: 56, marginBottom: 8 },
  heroTitle: { fontSize: 36, fontWeight: '800', color: '#FFFFFF', marginBottom: 8 },
  heroSub: { fontSize: 14, color: '#A8ADCF', textAlign: 'center', lineHeight: 20 },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#16213E',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statValue: { fontSize: 20, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 },
  statLabel: { fontSize: 11, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 0.5 },
  rankBadge: {
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#16213E',
  },
  rankText: { fontSize: 22, fontWeight: '800', marginBottom: 2 },
  rankSub: { fontSize: 12, color: '#6B7280' },
  todayBadge: {
    backgroundColor: '#0D3B2E',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  todayText: { color: '#00C896', fontSize: 13, textAlign: 'center', fontWeight: '600' },
  startButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#6C63FF',
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  startButtonText: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  rulesCard: {
    backgroundColor: '#16213E',
    borderRadius: 16,
    padding: 20,
    gap: 8,
  },
  rulesTitle: { fontSize: 15, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  rulesText: { fontSize: 14, color: '#A8ADCF', lineHeight: 22 },
});
