import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

export default function AnswerButton({ label, state, onPress, disabled }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (state === 'correct' || state === 'wrong') {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 0.96, duration: 80, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
      ]).start();
    }
  }, [state]);

  const bgColor =
    state === 'correct' ? '#00C896' :
    state === 'wrong' ? '#FF4757' :
    '#16213E';

  const borderColor =
    state === 'correct' ? '#00C896' :
    state === 'wrong' ? '#FF4757' :
    '#2D3561';

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: bgColor, borderColor }]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text style={styles.label} numberOfLines={2}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    borderWidth: 1.5,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    minHeight: 56,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
