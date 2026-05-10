import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.06, duration: 1000, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>⚔️  DUNGEON CRAWLER</Text>
        <Animated.Text style={[styles.title, { transform: [{ scale: scaleAnim }] }]}>
          CARD ROGUE
        </Animated.Text>
        <Text style={styles.tagline}>Choose your cards. Conquer the dungeon.</Text>
      </View>

      <View style={styles.cardPreview}>
        {['⚔️', '🛡️', '🔥', '💚', '☠️', '⚡'].map((icon, i) => (
          <View key={i} style={styles.previewCard}>
            <Text style={styles.previewIcon}>{icon}</Text>
          </View>
        ))}
      </View>

      <View style={styles.rulesBox}>
        <Text style={styles.rulesTitle}>HOW TO PLAY</Text>
        <Text style={styles.rulesText}>• Pick 1 of 3 cards each turn</Text>
        <Text style={styles.rulesText}>• Defeat enemies to advance floors</Text>
        <Text style={styles.rulesText}>• Enemies grow stronger each floor</Text>
        <Text style={styles.rulesText}>• Survive as long as you can!</Text>
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('Battle')}
        activeOpacity={0.8}
      >
        <Text style={styles.startButtonText}>⚔️  ENTER DUNGEON</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Daily App — 2026-05-10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d1a',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
  },
  subtitle: {
    color: '#f0a500',
    fontSize: 13,
    letterSpacing: 4,
    marginBottom: 10,
  },
  title: {
    color: '#ffffff',
    fontSize: 46,
    fontWeight: '900',
    letterSpacing: 6,
    textShadowColor: '#f0a500',
    textShadowRadius: 20,
  },
  tagline: {
    color: '#6666aa',
    fontSize: 13,
    marginTop: 10,
    fontStyle: 'italic',
  },
  cardPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  previewCard: {
    width: 58,
    height: 72,
    backgroundColor: '#1a1a2e',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3a3a5e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewIcon: {
    fontSize: 28,
  },
  rulesBox: {
    backgroundColor: '#1a1a2e',
    borderRadius: 14,
    padding: 18,
    width: '100%',
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  rulesTitle: {
    color: '#f0a500',
    fontSize: 12,
    letterSpacing: 3,
    marginBottom: 10,
    textAlign: 'center',
  },
  rulesText: {
    color: '#9999bb',
    fontSize: 13,
    marginBottom: 5,
    lineHeight: 18,
  },
  startButton: {
    backgroundColor: '#f0a500',
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 14,
    shadowColor: '#f0a500',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  startButtonText: {
    color: '#0d0d1a',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 2,
  },
  version: {
    color: '#333355',
    fontSize: 11,
  },
});
