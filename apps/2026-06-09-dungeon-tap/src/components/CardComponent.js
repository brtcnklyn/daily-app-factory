import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TYPE_COLORS = {
  attack:  '#c0392b',
  defend:  '#2980b9',
  heal:    '#27ae60',
  special: '#8e44ad',
};

export default function CardComponent({ card, onPress, disabled }) {
  const color = TYPE_COLORS[card.type] || '#555';

  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: color }, disabled && styles.disabled]}
      onPress={() => !disabled && onPress(card)}
      activeOpacity={0.7}
    >
      <Text style={styles.emoji}>{card.emoji}</Text>
      <Text style={styles.name}>{card.name}</Text>
      <Text style={[styles.desc, { color }]}>{card.description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
  },
  disabled: {
    opacity: 0.35,
  },
  emoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  name: {
    color: '#e8e8f0',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  desc: {
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '600',
  },
});
