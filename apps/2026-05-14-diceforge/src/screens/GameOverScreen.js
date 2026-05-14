import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

function getRank(score) {
  if (score >= 800) return { label: 'LEGENDARY', emoji: '🏆', color: '#ffd700' };
  if (score >= 400) return { label: 'MASTER', emoji: '⚔️', color: '#ff6b35' };
  if (score >= 200) return { label: 'WARRIOR', emoji: '🛡️', color: '#a855f7' };
  if (score >= 100) return { label: 'APPRENTICE', emoji: '🎲', color: '#3b82f6' };
  return { label: 'NOVICE', emoji: '💀', color: '#6b7280' };
}

export default function GameOverScreen({ score, round, onRestart, onHome }) {
  const rank = getRank(score);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>GAME OVER</Text>
        <Text style={styles.skull}>💀</Text>

        <View style={styles.statsBox}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>ROUNDS</Text>
            <Text style={[styles.statValue, { color: '#3b82f6' }]}>{round}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statLabel}>TOTAL DMG</Text>
            <Text style={[styles.statValue, { color: '#e94560' }]}>{score}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statLabel}>RANK</Text>
            <Text style={[styles.statValue, { color: rank.color, fontSize: 28 }]}>
              {rank.emoji}
            </Text>
          </View>
        </View>

        <View style={[styles.rankBadge, { borderColor: rank.color }]}>
          <Text style={[styles.rankLabel, { color: rank.color }]}>{rank.label}</Text>
          <Text style={styles.rankDesc}>
            {score >= 800
              ? 'Unstoppable dice master!'
              : score >= 400
              ? 'A fearsome fighter!'
              : score >= 200
              ? 'Solid combo skills!'
              : score >= 100
              ? 'Getting the hang of it!'
              : 'Keep rolling, warrior!'}
          </Text>
        </View>

        <TouchableOpacity style={styles.restartBtn} onPress={onRestart} activeOpacity={0.85}>
          <Text style={styles.restartText}>🎲  PLAY AGAIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeBtn} onPress={onHome} activeOpacity={0.7}>
          <Text style={styles.homeText}>← MAIN MENU</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#e94560',
    letterSpacing: 5,
    marginBottom: 12,
  },
  skull: {
    fontSize: 60,
    marginBottom: 28,
  },
  statsBox: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#0f3460',
    alignItems: 'center',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    color: '#6b7280',
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 8,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 36,
    fontWeight: '900',
  },
  divider: {
    width: 1,
    height: 50,
    backgroundColor: '#0f3460',
  },
  rankBadge: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 36,
    backgroundColor: '#16213e',
  },
  rankLabel: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 3,
    marginBottom: 6,
  },
  rankDesc: {
    color: '#a0a0c0',
    fontSize: 14,
  },
  restartBtn: {
    backgroundColor: '#e94560',
    paddingVertical: 16,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    marginBottom: 14,
  },
  restartText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 2,
  },
  homeBtn: {
    paddingVertical: 10,
  },
  homeText: {
    color: '#6b7280',
    fontSize: 14,
    letterSpacing: 1,
  },
});
