import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HealthBar({ current, max, color }) {
  const pct = Math.max(0, Math.min(1, current / max));

  return (
    <View style={styles.wrapper}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct * 100}%`, backgroundColor: color }]} />
      </View>
      <Text style={[styles.label, { color }]}>
        {current} / {max} HP
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  track: {
    height: 12,
    backgroundColor: '#0d0520',
    borderRadius: 6,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'right',
  },
});
