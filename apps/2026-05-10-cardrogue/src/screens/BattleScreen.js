import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Card from '../components/Card';
import HealthBar from '../components/HealthBar';

const CARDS = [
  {
    id: 'strike',
    name: 'Strike',
    icon: '⚔️',
    description: 'Deal 10–18 damage',
    type: 'attack',
    color: '#e74c3c',
    minDmg: 10,
    maxDmg: 18,
  },
  {
    id: 'block',
    name: 'Block',
    icon: '🛡️',
    description: 'Shield next hit + 5 dmg',
    type: 'defend',
    color: '#3498db',
    minDmg: 5,
    maxDmg: 5,
  },
  {
    id: 'fireball',
    name: 'Fireball',
    icon: '🔥',
    description: 'Deal 22–30 damage',
    type: 'attack',
    color: '#e67e22',
    minDmg: 22,
    maxDmg: 30,
  },
  {
    id: 'heal',
    name: 'Heal',
    icon: '💚',
    description: 'Restore 12–18 HP',
    type: 'heal',
    color: '#2ecc71',
    minDmg: 0,
    maxDmg: 0,
  },
  {
    id: 'poison',
    name: 'Poison',
    icon: '☠️',
    description: '8 dmg + 3-turn poison',
    type: 'attack',
    color: '#9b59b6',
    minDmg: 8,
    maxDmg: 8,
  },
  {
    id: 'doublestrike',
    name: 'Double Strike',
    icon: '⚡',
    description: 'Deal 8 damage twice',
    type: 'attack',
    color: '#f1c40f',
    minDmg: 8,
    maxDmg: 8,
  },
];

const ENEMIES = [
  { name: 'Goblin',   icon: '👺', minHP: 25, maxHP: 35, minAtk: 6,  maxAtk: 10 },
  { name: 'Skeleton', icon: '💀', minHP: 32, maxHP: 46, minAtk: 8,  maxAtk: 13 },
  { name: 'Orc',      icon: '👹', minHP: 45, maxHP: 60, minAtk: 12, maxAtk: 17 },
  { name: 'Vampire',  icon: '🧛', minHP: 55, maxHP: 72, minAtk: 14, maxAtk: 20 },
  { name: 'Dragon',   icon: '🐉', minHP: 70, maxHP: 90, minAtk: 18, maxAtk: 25 },
];

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildEnemy(level) {
  const idx = Math.min(Math.floor((level - 1) / 2), ENEMIES.length - 1);
  const base = ENEMIES[idx];
  const hp = rnd(base.minHP, base.maxHP) + (level - 1) * 4;
  const atk = rnd(base.minAtk, base.maxAtk) + Math.floor((level - 1) / 2);
  return { ...base, hp, maxHP: hp, atk };
}

function drawHand() {
  return [...CARDS].sort(() => Math.random() - 0.5).slice(0, 3);
}

const PLAYER_MAX_HP = 50;

export default function BattleScreen({ navigation }) {
  const [playerHP, setPlayerHP] = useState(PLAYER_MAX_HP);
  const [shield, setShield] = useState(false);
  const [poisonTurns, setPoisonTurns] = useState(0);
  const [level, setLevel] = useState(1);
  const [enemy, setEnemy] = useState(() => buildEnemy(1));
  const [hand, setHand] = useState(() => drawHand());
  const [log, setLog] = useState([`Floor 1: ${buildEnemy(1).name} appears!`]);
  const [phase, setPhase] = useState('battle');
  const [score, setScore] = useState(0);
  const [busy, setBusy] = useState(false);

  const shakeX = useRef(new Animated.Value(0)).current;

  function addLog(msg) {
    setLog(prev => [msg, ...prev].slice(0, 5));
  }

  function shakeEnemy() {
    Animated.sequence([
      Animated.timing(shakeX, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: 6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  }

  function playCard(card) {
    if (busy || phase !== 'battle') return;
    setBusy(true);

    let hp = playerHP;
    let enemyHP = enemy.hp;
    let shd = shield;
    let poison = poisonTurns;
    let dmgDealt = 0;

    if (poison > 0) {
      enemyHP -= 6;
      dmgDealt += 6;
      poison--;
      addLog(`☠️ Poison deals 6 to ${enemy.name}!`);
    }

    if (card.type === 'attack') {
      let dmg;
      if (card.id === 'doublestrike') {
        dmg = card.minDmg * 2;
      } else {
        dmg = rnd(card.minDmg, card.maxDmg);
      }
      if (card.id === 'poison') {
        poison = 3;
        addLog(`☠️ ${enemy.name} is poisoned for 3 turns!`);
      }
      enemyHP -= dmg;
      dmgDealt += dmg;
      shakeEnemy();
      addLog(`${card.icon} ${card.name} hits for ${dmg}!`);
    } else if (card.type === 'defend') {
      shd = true;
      enemyHP -= 5;
      dmgDealt += 5;
      shakeEnemy();
      addLog(`🛡️ Block raised! Dealt 5 dmg.`);
    } else if (card.type === 'heal') {
      const amt = rnd(12, 18);
      hp = Math.min(PLAYER_MAX_HP, hp + amt);
      addLog(`💚 Healed for ${amt} HP!`);
    }

    const newScore = score + dmgDealt;
    setScore(newScore);

    if (enemyHP <= 0) {
      setEnemy(prev => ({ ...prev, hp: 0 }));
      setPlayerHP(hp);
      setPoisonTurns(0);
      setShield(false);
      addLog(`🏆 ${enemy.name} defeated!`);
      setTimeout(() => {
        setPhase('levelup');
        setBusy(false);
      }, 600);
      return;
    }

    let atkDmg = rnd(Math.max(1, enemy.atk - 3), enemy.atk);
    if (shd) {
      atkDmg = Math.floor(atkDmg * 0.5);
      shd = false;
      addLog(`🛡️ Shield absorbs! ${enemy.name} deals ${atkDmg}.`);
    } else {
      addLog(`${enemy.icon} ${enemy.name} attacks for ${atkDmg}!`);
    }
    hp -= atkDmg;

    setEnemy(prev => ({ ...prev, hp: enemyHP }));
    setPoisonTurns(poison);
    setShield(shd);

    if (hp <= 0) {
      setPlayerHP(0);
      addLog(`💀 You fell on floor ${level}...`);
      setTimeout(() => {
        navigation.replace('GameOver', { level, score: newScore });
      }, 1000);
    } else {
      setPlayerHP(hp);
      setHand(drawHand());
      setBusy(false);
    }
  }

  function advanceFloor() {
    const next = level + 1;
    const newEnemy = buildEnemy(next);
    const healAmt = Math.floor(PLAYER_MAX_HP * 0.3);
    setLevel(next);
    setEnemy(newEnemy);
    setPlayerHP(hp => Math.min(PLAYER_MAX_HP, hp + healAmt));
    setShield(false);
    setPoisonTurns(0);
    setHand(drawHand());
    setLog([`Floor ${next}: ${newEnemy.name} appears!`, `💚 +${healAmt} HP restored.`]);
    setPhase('battle');
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.floorLabel}>FLOOR {level}</Text>
        <Text style={styles.scoreLabel}>DMG {score}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.exitBtn}
        >
          <Text style={styles.exitBtnText}>✕</Text>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[styles.enemyBox, { transform: [{ translateX: shakeX }] }]}
      >
        <Text style={styles.enemyIcon}>{enemy.icon}</Text>
        <Text style={styles.enemyName}>{enemy.name}</Text>
        {poisonTurns > 0 && (
          <Text style={styles.poisonTag}>☠️ poisoned ×{poisonTurns}</Text>
        )}
        <HealthBar current={enemy.hp} max={enemy.maxHP} color="#e74c3c" />
      </Animated.View>

      <View style={styles.logBox}>
        {log.map((entry, i) => (
          <Text
            key={i}
            style={[styles.logLine, i === 0 && styles.logLineLatest]}
          >
            {entry}
          </Text>
        ))}
      </View>

      <View style={styles.playerBox}>
        <Text style={styles.playerLabel}>
          🧙 HERO {shield ? '  🛡️ SHIELD ACTIVE' : ''}
        </Text>
        <HealthBar current={playerHP} max={PLAYER_MAX_HP} color="#2ecc71" />
      </View>

      {phase === 'battle' && (
        <View style={styles.hand}>
          <Text style={styles.handLabel}>CHOOSE A CARD</Text>
          <View style={styles.cardRow}>
            {hand.map((card, i) => (
              <Card
                key={i}
                card={card}
                onPress={() => playCard(card)}
                disabled={busy}
              />
            ))}
          </View>
        </View>
      )}

      {phase === 'levelup' && (
        <View style={styles.overlay}>
          <Text style={styles.victoryTitle}>🏆 VICTORY!</Text>
          <Text style={styles.victoryFloor}>Floor {level} cleared</Text>
          <Text style={styles.victoryHeal}>
            +{Math.floor(PLAYER_MAX_HP * 0.3)} HP restored
          </Text>
          <TouchableOpacity style={styles.nextButton} onPress={advanceFloor}>
            <Text style={styles.nextButtonText}>NEXT FLOOR  ▶</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d1a',
    paddingTop: 52,
    paddingHorizontal: 14,
    paddingBottom: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  floorLabel: {
    color: '#f0a500',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 3,
  },
  scoreLabel: {
    color: '#6666aa',
    fontSize: 13,
    letterSpacing: 2,
  },
  exitBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1e1e30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitBtnText: {
    color: '#666688',
    fontSize: 17,
  },
  enemyBox: {
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  enemyIcon: {
    fontSize: 60,
    marginBottom: 6,
  },
  enemyName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  poisonTag: {
    color: '#9b59b6',
    fontSize: 12,
    marginBottom: 6,
  },
  logBox: {
    backgroundColor: '#0a0a15',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    minHeight: 72,
    borderWidth: 1,
    borderColor: '#1e1e30',
  },
  logLine: {
    color: '#444466',
    fontSize: 11,
    marginBottom: 2,
    lineHeight: 16,
  },
  logLineLatest: {
    color: '#ccccee',
    fontSize: 12,
    fontWeight: '600',
  },
  playerBox: {
    backgroundColor: '#1a1a2e',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  playerLabel: {
    color: '#aaaacc',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  hand: {
    flex: 1,
  },
  handLabel: {
    color: '#f0a500',
    fontSize: 11,
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  victoryTitle: {
    color: '#f0a500',
    fontSize: 48,
    fontWeight: '900',
    marginBottom: 10,
  },
  victoryFloor: {
    color: '#ffffff',
    fontSize: 20,
    marginBottom: 8,
  },
  victoryHeal: {
    color: '#2ecc71',
    fontSize: 17,
    marginBottom: 36,
  },
  nextButton: {
    backgroundColor: '#f0a500',
    paddingVertical: 16,
    paddingHorizontal: 44,
    borderRadius: 14,
  },
  nextButtonText: {
    color: '#0d0d1a',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 2,
  },
});
