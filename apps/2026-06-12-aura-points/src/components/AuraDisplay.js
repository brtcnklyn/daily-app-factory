import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function getAuraColor(score) {
  if (score >= 80) return '#A78BFA';
  if (score >= 60) return '#60A5FA';
  if (score >= 40) return '#34D399';
  if (score >= 20) return '#FBBF24';
  return '#F87171';
}

export function getAuraLabel(score) {
  if (score >= 90) return 'Transcendent';
  if (score >= 75) return 'Radiant';
  if (score >= 60) return 'Elevated';
  if (score >= 45) return 'Balanced';
  if (score >= 30) return 'Dim';
  return 'Depleted';
}

export default function AuraDisplay({ score, size = 'large' }) {
  const isLarge = size === 'large';
  const color = getAuraColor(score);

  return (
    <View style={styles.container}>
      <Text style={[styles.score, { color, fontSize: isLarge ? 88 : 36 }]}>{score}</Text>
      <Text style={[styles.label, { color, fontSize: isLarge ? 18 : 13 }]}>
        {getAuraLabel(score)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  score: { fontWeight: '800' },
  label: { fontWeight: '600', marginTop: 4, opacity: 0.85 },
});
