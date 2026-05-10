import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function getRank(level) {
  if (level >= 10) return { title: 'LEGEND', icon: '👑', color: '#f0a500' };
  if (level >= 7)  return { title: 'HERO',   icon: '⭐', color: '#e74c3c' };
  if (level >= 4)  return { title: 'WARRIOR', icon: '⚔️', color: '#3498db' };
  return { title: 'NOVICE', icon: '🌱', color: '#2ecc71' };
}

export default function GameOverScreen({ navigation, route }) {
  const { level = 1, score = 0 } = route.params || {};
  const rank = getRank(level);

  return (
    <View style={styles.container}>
      <Text style={styles.gameOverText}>GAME OVER</Text>

      <View style={styles.resultCard}>
        <Text style={styles.rankIcon}>{rank.icon}</Text>
        <Text style={[styles.rankTitle, { color: rank.color }]}>{rank.title}</Text>

        <View style={styles.divider} />

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>FLOORS CLEARED</Text>
          <Text style={styles.statValue}>{Math.max(0, level - 1)}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>REACHED FLOOR</Text>
          <Text style={styles.statValue}>{level}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>TOTAL DAMAGE</Text>
          <Text style={styles.statValue}>{score}</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.replace('Battle')}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>⚔️  TRY AGAIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>🏠  MAIN MENU</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  gameOverText: {
    color: '#e74c3c',
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: 8,
    marginBottom: 40,
    textShadowColor: '#e74c3c',
    textShadowRadius: 20,
  },
  resultCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#2a2a4e',
    marginBottom: 40,
  },
  rankIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  rankTitle: {
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 4,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#2a2a4e',
    width: '80%',
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  statLabel: {
    color: '#666688',
    fontSize: 13,
    letterSpacing: 2,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  buttons: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 2,
  },
  secondaryButton: {
    backgroundColor: '#1e1e30',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  secondaryButtonText: {
    color: '#8888aa',
    fontSize: 15,
    fontWeight: '600',
  },
});
