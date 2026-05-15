import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HUD({ score, level, coinsLeft, onHome }) {
  return (
    <View style={styles.hud}>
      <TouchableOpacity onPress={onHome} style={styles.exitBtn} activeOpacity={0.7}>
        <Text style={styles.exitText}>✕</Text>
      </TouchableOpacity>

      <View style={styles.statGroup}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{score}</Text>
          <Text style={styles.statLabel}>PUAN</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={[styles.statValue, styles.levelText]}>Lv.{level}</Text>
          <Text style={styles.statLabel}>SEVİYE</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={[styles.statValue, styles.coinText]}>💰 ×{coinsLeft}</Text>
          <Text style={styles.statLabel}>KALAN</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hud: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  exitBtn: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#2a2a42',
  },
  exitText: {
    color: '#667788',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#111128',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#1e1e38',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  levelText: {
    color: '#4a9eff',
  },
  coinText: {
    color: '#ffd700',
    fontSize: 16,
  },
  statLabel: {
    fontSize: 9,
    color: '#445566',
    letterSpacing: 1.5,
    marginTop: 1,
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: '#1e2e3e',
  },
});
