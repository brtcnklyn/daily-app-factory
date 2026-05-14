import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EnemyBar({ enemy, hp }) {
  const pct = Math.max(0, hp / enemy.maxHp);
  const barColor = pct > 0.6 ? '#e94560' : pct > 0.3 ? '#f59e0b' : '#6b7280';

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.name}>👹  {enemy.name}</Text>
        <Text style={styles.hpText}>
          {hp} / {enemy.maxHp} HP
        </Text>
      </View>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${pct * 100}%`, backgroundColor: barColor }]} />
      </View>
      <Text style={styles.attackHint}>⚡ Attacks for {enemy.attack} damage per turn</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16213e',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e94560',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    color: '#e94560',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  hpText: {
    color: '#a0a0c0',
    fontSize: 13,
    fontWeight: '600',
  },
  barBg: {
    height: 12,
    backgroundColor: '#0f3460',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  barFill: {
    height: '100%',
    borderRadius: 6,
  },
  attackHint: {
    color: '#6b7280',
    fontSize: 11,
    letterSpacing: 0.3,
  },
});
