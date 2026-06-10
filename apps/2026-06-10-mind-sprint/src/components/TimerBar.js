import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

export default function TimerBar({ timeLeft, maxTime }) {
  const progress = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: timeLeft / maxTime,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [timeLeft, maxTime]);

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const barColor = progress.interpolate({
    inputRange: [0, 0.35, 1],
    outputRange: ['#EF4444', '#F59E0B', '#10B981'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.bar, { width: barWidth, backgroundColor: barColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    backgroundColor: '#1E1B4B',
    borderRadius: 3,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginBottom: 8,
  },
  bar: {
    height: '100%',
    borderRadius: 3,
  },
});
