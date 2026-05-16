import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import HealthBar from '../components/HealthBar';

const CARD_POOL = ['attack', 'attack', 'attack', 'shield', 'shield', 'heal'];

const ENEMIES = [
  { name: 'Goblin',      emoji: '👺', hpMin: 14, hpMax: 20, atkMin: 3, atkMax: 7  },
  { name: 'Orc',         emoji: '👹', hpMin: 20, hpMax: 28, atkMin: 5, atkMax: 10 },
  { name: 'Skeleton',    emoji: '💀', hpMin: 18, hpMax: 26, atkMin: 6, atkMax: 12 },
  { name: 'Troll',       emoji: '🧌', hpMin: 28, hpMax: 36, atkMin: 7, atkMax: 13 },
  { name: 'Dark Wizard', emoji: '🧙', hpMin: 24, hpMax: 32, atkMin: 9, atkMax: 16 },
  { name: 'Dragon',      emoji: '🐉', hpMin: 36, hpMax: 50, atkMin: 10, atkMax: 18 },
];

const TOTAL_FLOORS = ENEMIES.length;
const PLAYER_MAX_HP = 30;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeCard() {
  const type = CARD_POOL[rand(0, CARD_POOL.length - 1)];
  return {
    id: Math.random().toString(36).slice(2),
    type,
    value: type === 'attack' ? rand(6, 14) : type === 'heal' ? rand(5, 10) : 0,
  };
}

function makeHand() {
  return [makeCard(), makeCard(), makeCard(), makeCard()];
}

function spawnEnemy(floor) {
  const e = ENEMIES[floor - 1];
  const hp = rand(e.hpMin, e.hpMax);
  return { ...e, hp, maxHp: hp };
}

export default function GameScreen({ navigation }) {
  const [playerHp, setPlayerHp] = useState(PLAYER_MAX_HP);
  const [floor, setFloor] = useState(1);
  const [enemy, setEnemy] = useState(() => spawnEnemy(1));
  const [hand, setHand] = useState(makeHand);
  const [shielded, setShielded] = useState(false);
  const [message, setMessage] = useState(() => `A ${ENEMIES[0].name} appears on floor 1!`);
  const [locked, setLocked] = useState(false);

  const playCard = useCallback((card, index) => {
    if (locked) return;
    setLocked(true);

    let hp = playerHp;
    let enemyHp = enemy.hp;
    let nextShielded = false;
    const log = [];

    if (card.type === 'attack') {
      enemyHp = Math.max(0, enemyHp - card.value);
      log.push(`You strike for ${card.value} damage!`);
    } else if (card.type === 'shield') {
      nextShielded = true;
      log.push('You raise your shield, blocking the next hit!');
    } else {
      hp = Math.min(PLAYER_MAX_HP, hp + card.value);
      log.push(`You heal ${card.value} HP!`);
    }

    if (enemyHp > 0) {
      if (shielded) {
        log.push(`${enemy.name} attacks — BLOCKED by your shield!`);
      } else {
        const dmg = rand(enemy.atkMin, enemy.atkMax);
        hp = Math.max(0, hp - dmg);
        log.push(`${enemy.name} hits you for ${dmg}!`);
      }
    }

    const newHand = hand.map((c, i) => (i === index ? makeCard() : c));

    if (hp <= 0) {
      navigation.replace('Result', { floors: floor - 1, won: false });
      return;
    }

    if (enemyHp <= 0) {
      if (floor >= TOTAL_FLOORS) {
        navigation.replace('Result', { floors: TOTAL_FLOORS, won: true });
        return;
      }
      const nextFloor = floor + 1;
      const nextEnemy = spawnEnemy(nextFloor);
      log.push(`${enemy.name} defeated! Descending to floor ${nextFloor}...`);
      setFloor(nextFloor);
      setEnemy(nextEnemy);
      setHand(makeHand());
      setMessage(log.join(' ') + ` A ${nextEnemy.name} lurks ahead.`);
    } else {
      setEnemy({ ...enemy, hp: enemyHp });
      setHand(newHand);
      setMessage(log.join(' '));
    }

    setPlayerHp(hp);
    setShielded(nextShielded);
    setLocked(false);
  }, [locked, playerHp, enemy, hand, shielded, floor, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.floorText}>Floor {floor} / {TOTAL_FLOORS}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.quitBtn}>
          <Text style={styles.quitText}>✕ Quit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.enemyCard}>
        <Text style={styles.enemyEmoji}>{enemy.emoji}</Text>
        <Text style={styles.enemyName}>{enemy.name}</Text>
        <HealthBar current={enemy.hp} max={enemy.maxHp} color="#e05050" />
        <Text style={styles.enemyAtk}>Attacks for {enemy.atkMin}–{enemy.atkMax} dmg</Text>
      </View>

      <View style={styles.messageBox}>
        <Text style={styles.messageText}>{message}</Text>
      </View>

      <View style={styles.playerCard}>
        <View style={styles.playerRow}>
          <Text style={styles.playerLabel}>Hero</Text>
          {shielded && <Text style={styles.shieldBadge}>🛡️ Shielded</Text>}
        </View>
        <HealthBar current={playerHp} max={PLAYER_MAX_HP} color="#50c080" />
      </View>

      <Text style={styles.handLabel}>Your Hand — tap a card to play it</Text>
      <View style={styles.hand}>
        {hand.map((card, index) => (
          <Card key={card.id} card={card} onPress={() => playCard(card, index)} />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a0a2e',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  floorText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#f0c060',
  },
  quitBtn: {
    padding: 6,
  },
  quitText: {
    fontSize: 13,
    color: '#5040a0',
    fontWeight: '600',
  },
  enemyCard: {
    backgroundColor: '#2d1a4e',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5030a0',
    marginBottom: 12,
  },
  enemyEmoji: {
    fontSize: 52,
    marginBottom: 6,
  },
  enemyName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#e05050',
    marginBottom: 10,
  },
  enemyAtk: {
    fontSize: 12,
    color: '#a06060',
    marginTop: 6,
  },
  messageBox: {
    backgroundColor: '#0d0520',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    minHeight: 52,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3020608a',
  },
  messageText: {
    fontSize: 13,
    color: '#c0a0f0',
    textAlign: 'center',
    lineHeight: 19,
  },
  playerCard: {
    backgroundColor: '#2d1a4e',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#5030a0',
    marginBottom: 16,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  playerLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#50c080',
  },
  shieldBadge: {
    fontSize: 13,
    color: '#60c0f0',
    fontWeight: '600',
  },
  handLabel: {
    fontSize: 11,
    color: '#6050a0',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  hand: {
    flexDirection: 'row',
    gap: 8,
  },
});
