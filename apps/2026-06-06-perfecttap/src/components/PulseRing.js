import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const RING_SIZE = 200;
const TARGET_SIZE = 90;

export default function PulseRing({ scale, color }) {
  const opacity = scale.interpolate({
    inputRange: [0, 0.35, 0.45, 0.55, 1],
    outputRange: [0.15, 0.65, 1, 0.65, 0.1],
  });

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.targetRing,
          { borderColor: color + '70' },
        ]}
      />
      <Animated.View
        style={[
          styles.pulseRing,
          {
            borderColor: color,
            opacity,
            transform: [{ scale }],
          },
        ]}
      />
      <View style={[styles.centerDot, { backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: RING_SIZE + 80,
    height: RING_SIZE + 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetRing: {
    position: 'absolute',
    width: TARGET_SIZE,
    height: TARGET_SIZE,
    borderRadius: TARGET_SIZE / 2,
    borderWidth: 3,
  },
  pulseRing: {
    position: 'absolute',
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 3,
  },
  centerDot: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
  },
});
