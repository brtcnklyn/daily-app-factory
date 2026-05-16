import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.emoji}>⚔️</Text>
        <Text style={styles.title}>DeckDungeon</Text>
        <Text style={styles.subtitle}>Roguelike Card Battle</Text>
      </View>

      <View style={styles.rulesBox}>
        <Text style={styles.rulesTitle}>How to Play</Text>
        <Text style={styles.rule}>🃏  Draw 4 cards each turn</Text>
        <Text style={styles.rule}>⚔️  Attack to deal damage to enemy</Text>
        <Text style={styles.rule}>🛡️  Shield blocks the next enemy hit</Text>
        <Text style={styles.rule}>💚  Heal restores your HP</Text>
        <Text style={styles.rule}>🐉  Enemies grow stronger each floor</Text>
        <Text style={styles.rule}>🏆  Survive all 6 floors to win!</Text>
      </View>

      <TouchableOpacity
        style={styles.playButton}
        onPress={() => navigation.navigate('Game')}
        activeOpacity={0.8}
      >
        <Text style={styles.playButtonText}>⚔️  Enter Dungeon</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>How deep can you go?</Text>
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
  titleContainer: {
    alignItems: 'center',
    marginBottom: 36,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#f0c060',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#9070c0',
    marginTop: 4,
    letterSpacing: 1,
  },
  rulesBox: {
    backgroundColor: '#2d1a4e',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 36,
    borderWidth: 1,
    borderColor: '#5030a0',
    gap: 10,
  },
  rulesTitle: {
    fontSize: 13,
    color: '#9070c0',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  rule: {
    fontSize: 14,
    color: '#c0a0f0',
    lineHeight: 20,
  },
  playButton: {
    backgroundColor: '#7040d0',
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#7040d0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  playButtonText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 1,
  },
  hint: {
    fontSize: 14,
    color: '#5040a0',
    textAlign: 'center',
  },
});
