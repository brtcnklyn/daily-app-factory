import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import StreakBadge from '../components/StreakBadge';

const STORAGE_KEY = '@daily_vibes_streak';
const DATE_KEY = '@daily_vibes_last_date';

export default function HomeScreen({ navigation }) {
  const [streak, setStreak] = useState(0);
  const [alreadyCheckedIn, setAlreadyCheckedIn] = useState(false);

  const loadStreak = useCallback(async () => {
    try {
      const savedStreak = await AsyncStorage.getItem(STORAGE_KEY);
      const lastDate = await AsyncStorage.getItem(DATE_KEY);
      const today = new Date().toDateString();

      if (savedStreak !== null) {
        setStreak(parseInt(savedStreak, 10));
      }
      setAlreadyCheckedIn(lastDate === today);
    } catch (e) {
      // ignore storage errors
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadStreak();
    }, [loadStreak])
  );

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>✨ DailyVibes</Text>
          <Text style={styles.date}>{today}</Text>
        </View>

        <StreakBadge streak={streak} />

        <View style={styles.centerBlock}>
          <Text style={styles.tagline}>
            {alreadyCheckedIn
              ? "You've checked in today!"
              : "What's your vibe today?"}
          </Text>
          <Text style={styles.subtitle}>
            {alreadyCheckedIn
              ? 'Come back tomorrow to keep your streak going'
              : 'Get your personalized daily vibe reading in seconds'}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, alreadyCheckedIn && styles.buttonDisabled]}
          onPress={() => navigation.navigate('MoodPicker')}
          disabled={alreadyCheckedIn}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {alreadyCheckedIn ? '✅ See You Tomorrow' : '🔮 Get My Vibe'}
          </Text>
        </TouchableOpacity>

        {alreadyCheckedIn && (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('MoodPicker')}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryButtonText}>Redo Today's Reading</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A2E',
    letterSpacing: -0.5,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginTop: 6,
  },
  centerBlock: {
    alignItems: 'center',
    marginVertical: 32,
    paddingHorizontal: 16,
  },
  tagline: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A2E',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#7C3AED',
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 30,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: '#C4C4C4',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  secondaryButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  secondaryButtonText: {
    color: '#7C3AED',
    fontSize: 14,
    fontWeight: '600',
  },
});
