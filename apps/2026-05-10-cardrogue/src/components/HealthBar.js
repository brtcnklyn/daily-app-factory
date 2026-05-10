import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HealthBar({ current, max, color }) {
  const pct = Math.max(0, Math.min(1, current / max));
  const barColor = pct > 0.5 ? color : pct > 0.25 ? '#f39c12' : '#e74c3c';

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct * 100}%`, backgroundColor: barColor }]} />
      </View>
      <Text style={styles.label}>
        {Math.max(0, current)} / {max}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  track: {
    height: 10,
    backgroundColor: '#111122',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 4,
  },
  fill: {
    height: '100%',
    borderRadius: 5,
  },
  label: {
    color: '#666688',
    fontSize: 11,
    textAlign: 'right',
  },
});
