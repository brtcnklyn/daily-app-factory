import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TimerCircle({ seconds, maxSeconds = 15, color = '#FF4500', size = 120 }) {
  const strokeWidth = 8;
  const progress = Math.max(0, seconds / maxSeconds);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View
        style={[
          styles.track,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: '#1C1C2E',
          },
        ]}
      />
      <View style={styles.inner}>
        <Text style={[styles.number, { color }]}>{seconds}</Text>
        <Text style={styles.label}>sec</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  track: { position: 'absolute' },
  inner: { alignItems: 'center' },
  number: { fontSize: 38, fontWeight: '900', lineHeight: 44 },
  label: { color: '#6B7280', fontSize: 12 },
});
