import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResultScreen({ navigation, route }) {
  const { floors, won } = route.params;

  const title = won ? 'Victory!' : 'Defeated!';
  const subtitle = won
    ? 'You slew the Dragon and escaped the dungeon!'
    : floors === 0
    ? 'You fell on the very first floor...'
    : `You cleared ${floors} floor${floors !== 1 ? 's' : ''} before falling.`;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.resultEmoji}>{won ? '🏆' : '💀'}</Text>
      <Text style={[styles.title, won && styles.titleWon]}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.scoreBox}>
        <Text style={styles.scoreLabel}>Floors Cleared</Text>
        <Text style={styles.scoreValue}>{floors}</Text>
        <Text style={styles.scoreMax}>out of 6</Text>
      </View>

      {!won && (
        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>Tip</Text>
          <Text style={styles.tipText}>
            {floors < 2
              ? 'Use Shield cards to block big hits early on.'
              : floors < 4
              ? 'Heal when above half HP to bank up cushion.'
              : 'On later floors, shield before the Dragon strikes!'}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.replace('Game')}
        activeOpacity={0.8}
      >
        <Text style={styles.primaryButtonText}>⚔️  Play Again</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Home')}
        activeOpacity={0.8}
      >
        <Text style={styles.secondaryButtonText}>🏠  Main Menu</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a0a2e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  resultEmoji: {
    fontSize: 72,
    marginBottom: 12,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#e05050',
    marginBottom: 8,
  },
  titleWon: {
    color: '#f0c060',
  },
  subtitle: {
    fontSize: 15,
    color: '#9070c0',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  scoreBox: {
    backgroundColor: '#2d1a4e',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#5030a0',
  },
  scoreLabel: {
    fontSize: 13,
    color: '#9070c0',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  scoreValue: {
    fontSize: 64,
    fontWeight: '900',
    color: '#f0c060',
    lineHeight: 72,
  },
  scoreMax: {
    fontSize: 14,
    color: '#6050a0',
    marginTop: 2,
  },
  tipBox: {
    backgroundColor: '#1e0e38',
    borderRadius: 12,
    padding: 14,
    width: '100%',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#3020608a',
  },
  tipTitle: {
    fontSize: 11,
    color: '#6050a0',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: '#9070c0',
    lineHeight: 19,
  },
  primaryButton: {
    backgroundColor: '#7040d0',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#7040d0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  secondaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5030a0',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9070c0',
  },
});
