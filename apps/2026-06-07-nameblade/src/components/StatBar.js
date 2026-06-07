import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatBar({ label, value, max, color = '#6c63ff' }) {
  const pct = Math.min(1, value / max);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct * 100}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  label: {
    color: '#aaa',
    fontSize: 11,
    width: 60,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  track: {
    flex: 1,
    height: 8,
    backgroundColor: '#1e1e2e',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  value: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    width: 36,
    textAlign: 'right',
  },
});
