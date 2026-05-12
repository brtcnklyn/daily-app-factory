import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function PetAvatar({ healthPercent, petLevel }) {
  const bounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, {
          toValue: -14,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(bounce, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const petEmoji =
    healthPercent >= 80 ? '🐱' : healthPercent >= 40 ? '😺' : '🐾';

  const mood =
    healthPercent >= 80
      ? 'Thriving! 🌟'
      : healthPercent >= 40
      ? 'Doing okay 😊'
      : 'Needs your care 🥺';

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.bubbleText}>{mood}</Text>
        <View style={styles.bubbleTail} />
      </View>

      <Animated.View style={{ transform: [{ translateY: bounce }] }}>
        <Text style={styles.pet}>{petEmoji}</Text>
      </Animated.View>

      <View style={styles.shadow} />

      <View style={styles.levelBadge}>
        <Text style={styles.levelText}>Level {petLevel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  bubble: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 10,
    position: 'relative',
  },
  bubbleText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  bubbleTail: {
    position: 'absolute',
    bottom: -8,
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#7C3AED',
  },
  pet: {
    fontSize: 110,
  },
  shadow: {
    width: 90,
    height: 14,
    backgroundColor: 'rgba(124,58,237,0.12)',
    borderRadius: 45,
    marginTop: 2,
  },
  levelBadge: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 14,
    marginTop: 10,
  },
  levelText: {
    color: '#7C3AED',
    fontWeight: '800',
    fontSize: 13,
  },
});
