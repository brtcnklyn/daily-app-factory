import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function HomeScreen({ onPlay, highScore }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.decoration}>⚔️  🏰  💀</Text>
        <Text style={styles.title}>DungeonSlide</Text>
        <Text style={styles.subtitle}>
          Kaydır, altın topla,{'\n'}düşmanlardan kaç
        </Text>

        {highScore > 0 && (
          <Text style={styles.highScore}>🏆 En İyi: {highScore}</Text>
        )}

        <TouchableOpacity style={styles.playButton} onPress={onPlay} activeOpacity={0.8}>
          <Text style={styles.playText}>▶  OYNA</Text>
        </TouchableOpacity>

        <View style={styles.legendRow}>
          <Text style={styles.legendItem}>⚔️ Sen</Text>
          <Text style={styles.legendItem}>💰 +10 puan</Text>
          <Text style={styles.legendItem}>💀 = Ölüm</Text>
        </View>

        <Text style={styles.hint}>
          Tüm altınları topla → Sonraki zindan
        </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  decoration: {
    fontSize: 44,
    marginBottom: 20,
    letterSpacing: 8,
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#4a9eff',
    letterSpacing: 2,
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 17,
    color: '#8899aa',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
  },
  highScore: {
    fontSize: 18,
    color: '#ffd700',
    marginBottom: 20,
    fontWeight: '600',
  },
  playButton: {
    backgroundColor: '#4a9eff',
    paddingHorizontal: 56,
    paddingVertical: 18,
    borderRadius: 14,
    marginBottom: 48,
    shadowColor: '#4a9eff',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  playText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 3,
  },
  legendRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  legendItem: {
    fontSize: 13,
    color: '#667788',
  },
  hint: {
    fontSize: 13,
    color: '#445566',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
