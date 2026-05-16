import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const CONFIG = {
  attack: { emoji: '⚔️', label: 'Attack', color: '#e06060', bg: '#3a1020', border: '#a03030' },
  shield: { emoji: '🛡️', label: 'Shield', color: '#60c0f0', bg: '#0e1e30', border: '#2060a0' },
  heal:   { emoji: '💚', label: 'Heal',   color: '#50c080', bg: '#0e2018', border: '#206040' },
};

export default function Card({ card, onPress }) {
  const cfg = CONFIG[card.type];

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cfg.bg, borderColor: cfg.border }]}
      onPress={onPress}
      activeOpacity={0.65}
    >
      <Text style={styles.emoji}>{cfg.emoji}</Text>
      <Text style={[styles.label, { color: cfg.color }]}>{cfg.label}</Text>
      {card.value > 0 ? (
        <View style={[styles.badge, { backgroundColor: cfg.border }]}>
          <Text style={styles.badgeText}>{card.value}</Text>
        </View>
      ) : (
        <View style={styles.badgePlaceholder} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    aspectRatio: 0.6,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  emoji: {
    fontSize: 30,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  badge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    minWidth: 28,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#ffffff',
  },
  badgePlaceholder: {
    height: 22,
  },
});
