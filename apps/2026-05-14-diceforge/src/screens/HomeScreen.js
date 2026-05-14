import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function HomeScreen({ onStart }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.titleArea}>
          <Text style={styles.dice}>🎲</Text>
          <Text style={styles.title}>DICEFORGE</Text>
          <Text style={styles.subtitle}>A Dice Roguelike</Text>
        </View>

        <Text style={styles.description}>
          Roll five dice, build Yahtzee-style combos, and deal damage to ever-stronger enemies. How many rounds can you survive?
        </Text>

        <View style={styles.rulesBox}>
          <Text style={styles.rulesTitle}>HOW TO PLAY</Text>
          <RuleRow icon="🎲" text="Roll up to 3 times per turn" />
          <RuleRow icon="🔒" text="Tap a die to hold it between rolls" />
          <RuleRow icon="⚔️" text="Attack with your best combo" />
          <RuleRow icon="💀" text="Survive as many rounds as possible" />
        </View>

        <View style={styles.comboBox}>
          <Text style={styles.comboTitle}>COMBO CHART</Text>
          <ComboRow name="High Card" dmg="1–6" color="#4b5563" />
          <ComboRow name="Pair" dmg="15" color="#6b7280" />
          <ComboRow name="Two Pair" dmg="30" color="#10b981" />
          <ComboRow name="Three of a Kind" dmg="45" color="#3b82f6" />
          <ComboRow name="Straight" dmg="60" color="#a855f7" />
          <ComboRow name="Full House" dmg="80" color="#e94560" />
          <ComboRow name="Four of a Kind" dmg="100" color="#ff6b35" />
          <ComboRow name="Five of a Kind" dmg="150" color="#ffd700" />
        </View>

        <TouchableOpacity style={styles.button} onPress={onStart} activeOpacity={0.85}>
          <Text style={styles.buttonText}>START GAME</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function RuleRow({ icon, text }) {
  return (
    <View style={styles.ruleRow}>
      <Text style={styles.ruleIcon}>{icon}</Text>
      <Text style={styles.ruleText}>{text}</Text>
    </View>
  );
}

function ComboRow({ name, dmg, color }) {
  return (
    <View style={styles.comboRow}>
      <Text style={[styles.comboName, { color }]}>{name}</Text>
      <Text style={styles.comboDmg}>{dmg} dmg</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  titleArea: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dice: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#e94560',
    letterSpacing: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#6b7280',
    letterSpacing: 4,
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: '#a0a0c0',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  rulesBox: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  rulesTitle: {
    color: '#e94560',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 10,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ruleIcon: {
    fontSize: 14,
    marginRight: 8,
    width: 20,
  },
  ruleText: {
    color: '#a0a0c0',
    fontSize: 13,
  },
  comboBox: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  comboTitle: {
    color: '#e94560',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 10,
  },
  comboRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  comboName: {
    fontSize: 13,
    fontWeight: '600',
  },
  comboDmg: {
    fontSize: 13,
    color: '#6b7280',
  },
  button: {
    backgroundColor: '#e94560',
    paddingVertical: 16,
    paddingHorizontal: 64,
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 3,
  },
});
