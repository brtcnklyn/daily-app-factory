import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VIBE_READINGS } from '../data/vibes';

const STORAGE_KEY = '@daily_vibes_streak';
const DATE_KEY = '@daily_vibes_last_date';

export default function VibeResultScreen({ navigation, route }) {
  const { mood } = route.params;
  const vibe = VIBE_READINGS[mood.id];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    saveStreakIfNeeded();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 65,
        friction: 9,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 65,
        friction: 9,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const saveStreakIfNeeded = async () => {
    try {
      const today = new Date().toDateString();
      const lastDate = await AsyncStorage.getItem(DATE_KEY);
      if (lastDate === today) return;

      const savedStreak = await AsyncStorage.getItem(STORAGE_KEY);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      let newStreak = 1;
      if (lastDate && new Date(lastDate).toDateString() === yesterday.toDateString()) {
        newStreak = (parseInt(savedStreak, 10) || 0) + 1;
      }

      await AsyncStorage.setItem(STORAGE_KEY, String(newStreak));
      await AsyncStorage.setItem(DATE_KEY, today);
    } catch (e) {
      // ignore storage errors
    }
  };

  const handleShare = () => {
    const shareText = `My vibe today is "${vibe.vibeName}" ${vibe.symbol}\n\n"${vibe.affirmation}"\n\n#DailyVibes #${mood.label}Vibe`;
    Alert.alert('Share Your Vibe', shareText, [
      { text: 'Done', style: 'default' },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: vibe.bgColor }]}>
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.moodHeader}>
          <Text style={styles.moodEmoji}>{mood.emoji}</Text>
          <Text style={styles.moodLabel}>{mood.label.toUpperCase()} VIBE</Text>
        </View>

        <Animated.View
          style={[
            styles.vibeCard,
            { borderColor: vibe.color, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text style={styles.vibeSymbol}>{vibe.symbol}</Text>
          <Text style={[styles.vibeName, { color: vibe.color }]}>{vibe.vibeName}</Text>
          <View style={[styles.divider, { backgroundColor: vibe.color }]} />
          <Text style={styles.affirmation}>{vibe.affirmation}</Text>
        </Animated.View>

        <View style={styles.activityBox}>
          <Text style={styles.activityLabel}>TODAY'S CHALLENGE</Text>
          <Text style={styles.activityText}>{vibe.activity}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.shareButton, { borderColor: vibe.color }]}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <Text style={[styles.shareButtonText, { color: vibe.color }]}>📤 Share</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.doneButton, { backgroundColor: vibe.color }]}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.8}
          >
            <Text style={styles.doneButtonText}>Done ✓</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodHeader: {
    alignItems: 'center',
    marginBottom: 28,
  },
  moodEmoji: {
    fontSize: 56,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#888',
    letterSpacing: 2,
  },
  vibeCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 28,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 10,
    marginBottom: 20,
  },
  vibeSymbol: {
    fontSize: 48,
    marginBottom: 12,
  },
  vibeName: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  divider: {
    width: 48,
    height: 3,
    borderRadius: 2,
    marginBottom: 16,
  },
  affirmation: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    lineHeight: 26,
    fontStyle: 'italic',
  },
  activityBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 28,
  },
  activityLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  activityText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
  },
  shareButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: 'transparent',
    marginRight: 10,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  doneButton: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
