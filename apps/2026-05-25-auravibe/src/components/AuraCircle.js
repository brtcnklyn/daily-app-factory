import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

export default function AuraCircle({ color, size = 160, emoji }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.06, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 0.9, duration: 1500, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.4, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.outer,
        {
          width: size + 24,
          height: size + 24,
          borderRadius: (size + 24) / 2,
          shadowColor: color,
          shadowOpacity: glowAnim,
          transform: [{ scale: pulseAnim }],
        },
      ]}
    >
      <View
        style={[
          styles.circle,
          { width: size, height: size, borderRadius: size / 2, backgroundColor: color },
        ]}
      >
        <Text style={{ fontSize: size * 0.36 }}>{emoji}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  outer: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 36,
    elevation: 16,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
