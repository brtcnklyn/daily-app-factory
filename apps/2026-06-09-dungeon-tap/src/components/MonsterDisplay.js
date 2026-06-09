import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ProgressBar({ value, max }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <View style={styles.barBg}>
      <View style={[styles.barFill, { width: `${pct}%` }]} />
    </View>
  );
}

export default function MonsterDisplay({ monster }) {
  const displayHp = Math.max(0, monster.hp);
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{monster.emoji}</Text>
      <Text style={styles.name}>{monster.name}</Text>
      <View style={styles.hpRow}>
        <Text style={styles.hpIcon}>❤️</Text>
        <View style={styles.barWrapper}>
          <ProgressBar value={displayHp} max={monster.maxHp} />
        </View>
        <Text style={styles.hpValue}>{displayHp}/{monster.maxHp}</Text>
      </View>
      <Text style={styles.attack}>⚔️  {monster.attack} damage per turn</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 20,
    marginVertical: 6,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  name: {
    color: '#e8e8f0',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  hpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  hpIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  barWrapper: {
    flex: 1,
    marginRight: 8,
  },
  barBg: {
    height: 14,
    backgroundColor: '#2a2a40',
    borderRadius: 7,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#e74c3c',
    borderRadius: 7,
  },
  hpValue: {
    color: '#e8e8f0',
    fontSize: 13,
    minWidth: 60,
    textAlign: 'right',
  },
  attack: {
    color: '#e67e22',
    fontSize: 14,
    fontWeight: '600',
  },
});
