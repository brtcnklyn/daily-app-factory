import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TimerBar({ timeLeft, totalTime }) {
  const progress = timeLeft / totalTime;
  const barColor =
    progress > 0.5 ? '#00C896' :
    progress > 0.25 ? '#FFD93D' :
    '#FF4757';

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress * 100}%`, backgroundColor: barColor }]} />
      </View>
      <Text style={[styles.label, { color: barColor }]}>{timeLeft}s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 24,
  },
  track: {
    flex: 1,
    height: 8,
    backgroundColor: '#2D3561',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    minWidth: 28,
    textAlign: 'right',
  },
});
