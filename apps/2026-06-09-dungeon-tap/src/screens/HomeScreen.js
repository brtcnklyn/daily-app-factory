import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function HomeScreen({ onStart, highScore }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>⚔️ DungeonTap</Text>
          <Text style={styles.subtitle}>Card Roguelike</Text>
        </View>

        <View style={styles.center}>
          <Text style={styles.art}>🏰</Text>
          <Text style={styles.desc}>
            Choose cards to fight monsters.{'\n'}
            Go deeper. Get stronger.{'\n'}
            How far can you survive?
          </Text>
        </View>

        {highScore > 0 && (
          <View style={styles.highScoreBox}>
            <Text style={styles.highScoreText}>🏆 Best Run: Floor {highScore}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.startBtn} onPress={onStart} activeOpacity={0.8}>
          <Text style={styles.startText}>Enter the Dungeon</Text>
        </TouchableOpacity>

        <View style={styles.guide}>
          <Text style={styles.guideTitle}>How to Play</Text>
          <Text style={styles.guideLine}>⚔️ Attack cards — deal damage to monster</Text>
          <Text style={styles.guideLine}>🛡️ Defend cards — block incoming damage</Text>
          <Text style={styles.guideLine}>💚 Heal cards — restore your HP</Text>
          <Text style={styles.guideLine}>🔄 Special cards — combine effects</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0d0d1a',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#f39c12',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#6e6e88',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  art: {
    fontSize: 80,
    marginBottom: 20,
  },
  desc: {
    color: '#9090a8',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 26,
  },
  highScoreBox: {
    alignItems: 'center',
    marginBottom: 14,
  },
  highScoreText: {
    color: '#f39c12',
    fontSize: 17,
    fontWeight: 'bold',
  },
  startBtn: {
    backgroundColor: '#c0392b',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  startText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  guide: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
  },
  guideTitle: {
    color: '#e8e8f0',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 1,
  },
  guideLine: {
    color: '#7070a0',
    fontSize: 13,
    lineHeight: 24,
    textAlign: 'center',
  },
});
