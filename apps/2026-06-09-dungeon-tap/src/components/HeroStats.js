import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ProgressBar({ value, max, color }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <View style={styles.barBg}>
      <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: color }]} />
    </View>
  );
}

export default function HeroStats({ hero, floor }) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.label}>🧙 Hero</Text>
        <Text style={styles.floor}>Floor {floor}</Text>
      </View>
      <View style={styles.statRow}>
        <Text style={styles.icon}>❤️</Text>
        <View style={styles.barWrapper}>
          <ProgressBar value={hero.hp} max={hero.maxHp} color="#e74c3c" />
        </View>
        <Text style={styles.value}>{hero.hp}/{hero.maxHp}</Text>
      </View>
      {hero.shield > 0 && (
        <Text style={styles.shield}>🛡️ {hero.shield} Shield active</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#e8e8f0',
    fontSize: 14,
    fontWeight: 'bold',
  },
  floor: {
    color: '#f39c12',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  barWrapper: {
    flex: 1,
    marginRight: 8,
  },
  barBg: {
    height: 12,
    backgroundColor: '#2a2a40',
    borderRadius: 6,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 6,
  },
  value: {
    color: '#e8e8f0',
    fontSize: 12,
    minWidth: 55,
    textAlign: 'right',
  },
  shield: {
    color: '#3498db',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
  },
});
