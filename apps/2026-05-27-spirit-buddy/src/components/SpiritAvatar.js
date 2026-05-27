import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SPIRIT_STATES = {
  radiant:   { emoji: '✨', label: 'Radiant Spirit',   color: '#FFB300', bg: '#FFF9E6' },
  happy:     { emoji: '🌟', label: 'Happy Spirit',     color: '#FF6B9D', bg: '#FFF0F6' },
  calm:      { emoji: '🌿', label: 'Calm Spirit',      color: '#43A047', bg: '#F0FFF0' },
  weary:     { emoji: '🌧️', label: 'Weary Spirit',     color: '#7986CB', bg: '#EEF0FF' },
  sleeping:  { emoji: '💤', label: 'Sleeping Spirit',  color: '#90A4AE', bg: '#F5F5F5' },
  awakening: { emoji: '🌱', label: 'Awakening Spirit', color: '#AB47BC', bg: '#FDF3FF' },
};

export function getSpiritState(avgMood) {
  if (avgMood === null || avgMood === undefined) return 'awakening';
  if (avgMood >= 4.5) return 'radiant';
  if (avgMood >= 3.5) return 'happy';
  if (avgMood >= 2.5) return 'calm';
  if (avgMood >= 1.5) return 'weary';
  return 'sleeping';
}

export default function SpiritAvatar({ avgMood, size = 120 }) {
  const stateKey = getSpiritState(avgMood);
  const state = SPIRIT_STATES[stateKey];
  const orbSize = size + 40;

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.orb,
          {
            width: orbSize,
            height: orbSize,
            borderRadius: orbSize / 2,
            backgroundColor: state.bg,
            borderColor: state.color,
          },
        ]}
      >
        <Text style={{ fontSize: size * 0.6, textAlign: 'center' }}>{state.emoji}</Text>
      </View>
      <Text style={[styles.label, { color: state.color }]}>{state.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center' },
  orb: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  label: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: '700',
  },
});
