import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

export default function ScoreCounter({ score }) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.25, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
  }, [score]);

  return (
    <Animated.Text style={[styles.text, { transform: [{ scale }] }]}>
      {score} pts
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#7C3AED',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
