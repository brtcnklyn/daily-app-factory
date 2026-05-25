import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';

export default function ResultScreen({ navigation, route }) {
  const { aura } = route.params;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 45,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 0.9, duration: 1600, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.3, duration: 1600, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d1a" />

      <Text style={styles.topLabel}>Your Aura Today</Text>

      <Animated.View
        style={[
          styles.auraGlow,
          {
            shadowColor: aura.color,
            shadowOpacity: glowAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={[styles.auraCircle, { backgroundColor: aura.color }]}>
          <Text style={styles.auraEmoji}>{aura.emoji}</Text>
        </View>
      </Animated.View>

      <Animated.View style={[styles.textBlock, { opacity: fadeAnim }]}>
        <Text style={[styles.auraName, { color: aura.color }]}>{aura.name}</Text>
        <Text style={styles.auraDesc}>{aura.description}</Text>
        <Text style={styles.dateText}>{aura.date}</Text>
      </Animated.View>

      <Animated.View style={[styles.buttons, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={[styles.shareBtn, { backgroundColor: aura.color }]}
          onPress={() => {}}
        >
          <Text style={styles.shareBtnText}>Share My Aura 📤</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.homeBtnText}>Back to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.historyBtn}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.historyBtnText}>View History →</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d1a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  topLabel: {
    color: '#7777aa',
    fontSize: 12,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 44,
  },
  auraGlow: {
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 50,
    elevation: 20,
    marginBottom: 44,
  },
  auraCircle: {
    width: 168,
    height: 168,
    borderRadius: 84,
    alignItems: 'center',
    justifyContent: 'center',
  },
  auraEmoji: {
    fontSize: 68,
  },
  textBlock: {
    alignItems: 'center',
    marginBottom: 52,
    paddingHorizontal: 8,
  },
  auraName: {
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  auraDesc: {
    color: '#ccccdd',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 27,
    marginBottom: 16,
  },
  dateText: {
    color: '#44445a',
    fontSize: 13,
  },
  buttons: {
    width: '100%',
  },
  shareBtn: {
    borderRadius: 50,
    paddingVertical: 17,
    alignItems: 'center',
    marginBottom: 12,
  },
  shareBtnText: {
    color: '#0d0d1a',
    fontSize: 16,
    fontWeight: '800',
  },
  homeBtn: {
    backgroundColor: '#151525',
    borderRadius: 50,
    paddingVertical: 17,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a40',
    marginBottom: 12,
  },
  homeBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  historyBtn: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  historyBtnText: {
    color: '#7777aa',
    fontSize: 14,
  },
});
