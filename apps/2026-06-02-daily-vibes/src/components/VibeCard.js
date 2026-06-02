import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function VibeCard({ vibe }) {
  return (
    <View style={[styles.card, { borderColor: vibe.color }]}>
      <Text style={styles.symbol}>{vibe.symbol}</Text>
      <Text style={[styles.name, { color: vibe.color }]}>{vibe.vibeName}</Text>
      <View style={[styles.divider, { backgroundColor: vibe.color }]} />
      <Text style={styles.affirmation}>{vibe.affirmation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 28,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 10,
  },
  symbol: {
    fontSize: 48,
    marginBottom: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  divider: {
    width: 48,
    height: 3,
    borderRadius: 2,
    marginBottom: 16,
  },
  affirmation: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    lineHeight: 26,
    fontStyle: 'italic',
  },
});
