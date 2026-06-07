import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StatBar from './StatBar';

export default function HeroCard({ fighter, isEnemy = false }) {
  const hpColor = fighter.hp / fighter.maxHp > 0.5
    ? '#22c55e'
    : fighter.hp / fighter.maxHp > 0.25
    ? '#f59e0b'
    : '#ef4444';

  const borderColor = isEnemy ? '#ef4444' : '#6c63ff';
  const emoji = isEnemy ? '👹' : '⚔️';

  return (
    <View style={[styles.card, { borderColor }]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.name} numberOfLines={1}>{fighter.name}</Text>
      <StatBar label="HP" value={fighter.hp} max={fighter.maxHp} color={hpColor} />
      <StatBar label="ATK" value={fighter.attack} max={200} color="#f97316" />
      <StatBar label="DEF" value={fighter.defense} max={100} color="#3b82f6" />
      <StatBar label="SPD" value={fighter.speed} max={26} color="#a855f7" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#12122a',
    borderRadius: 16,
    borderWidth: 2,
    padding: 16,
    flex: 1,
    margin: 6,
  },
  emoji: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 8,
  },
  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
});
