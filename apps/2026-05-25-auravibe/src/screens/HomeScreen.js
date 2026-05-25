import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [streak, setStreak] = useState(0);
  const [lastAura, setLastAura] = useState(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadStats);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.06, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const loadStats = async () => {
    try {
      const raw = await AsyncStorage.getItem('aura_history');
      if (raw) {
        const history = JSON.parse(raw);
        setStreak(history.length);
        if (history.length > 0) setLastAura(history[history.length - 1]);
      }
    } catch (_) {}
  };

  const alreadyCheckedToday = lastAura?.date === new Date().toDateString();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d1a" />

      <Text style={styles.topEmoji}>✨</Text>
      <Text style={styles.title}>AuraVibe</Text>
      <Text style={styles.subtitle}>Discover your daily energy</Text>

      {lastAura && (
        <View style={[styles.lastAuraCard, { borderColor: lastAura.color }]}>
          <Text style={styles.lastAuraLabel}>Last aura</Text>
          <View style={[styles.auraCircleSmall, { backgroundColor: lastAura.color }]}>
            <Text style={styles.lastAuraEmoji}>{lastAura.emoji}</Text>
          </View>
          <Text style={[styles.lastAuraName, { color: lastAura.color }]}>{lastAura.name}</Text>
        </View>
      )}

      <View style={styles.streakBadge}>
        <Text style={styles.streakText}>🔥 {streak} check-in{streak !== 1 ? 's' : ''}</Text>
      </View>

      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <TouchableOpacity
          style={[styles.button, alreadyCheckedToday && styles.buttonSecond]}
          onPress={() => navigation.navigate('Quiz')}
        >
          <Text style={styles.buttonText}>
            {alreadyCheckedToday ? 'Check Again ✨' : 'Check My Aura ✨'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => navigation.navigate('History')}
      >
        <Text style={styles.historyButtonText}>View History →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d1a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  topEmoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  title: {
    fontSize: 44,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 15,
    color: '#7777aa',
    marginTop: 8,
    marginBottom: 36,
  },
  lastAuraCard: {
    borderWidth: 1.5,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 24,
    width: '75%',
  },
  lastAuraLabel: {
    color: '#7777aa',
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  auraCircleSmall: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  lastAuraEmoji: {
    fontSize: 26,
  },
  lastAuraName: {
    fontSize: 16,
    fontWeight: '700',
  },
  streakBadge: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 36,
  },
  streakText: {
    color: '#fbbf24',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 52,
    paddingVertical: 18,
    borderRadius: 50,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.55,
    shadowRadius: 18,
    elevation: 10,
  },
  buttonSecond: {
    backgroundColor: '#4c1d95',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  historyButton: {
    marginTop: 24,
    padding: 12,
  },
  historyButtonText: {
    color: '#7777aa',
    fontSize: 15,
  },
});
