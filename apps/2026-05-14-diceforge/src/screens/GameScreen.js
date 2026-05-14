import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import DiceRoller from '../components/DiceRoller';
import EnemyBar from '../components/EnemyBar';
import ComboDisplay from '../components/ComboDisplay';

const MAX_ROLLS = 3;
const PLAYER_MAX_HP = 100;
const HEAL_PER_ROUND = 20;

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function evaluateHand(dice) {
  const counts = {};
  dice.forEach((d) => {
    counts[d] = (counts[d] || 0) + 1;
  });
  const vals = Object.values(counts).sort((a, b) => b - a);
  const keys = Object.keys(counts).map(Number).sort((a, b) => a - b);

  if (vals[0] === 5) return { name: 'FIVE OF A KIND', damage: 150, color: '#ffd700' };
  if (vals[0] === 4) return { name: 'FOUR OF A KIND', damage: 100, color: '#ff6b35' };
  if (vals[0] === 3 && vals[1] === 2) return { name: 'FULL HOUSE', damage: 80, color: '#e94560' };
  if (keys.length === 5 && keys[4] - keys[0] === 4) return { name: 'STRAIGHT', damage: 60, color: '#a855f7' };
  if (vals[0] === 3) return { name: 'THREE OF A KIND', damage: 45, color: '#3b82f6' };
  if (vals[0] === 2 && vals[1] === 2) return { name: 'TWO PAIR', damage: 30, color: '#10b981' };
  if (vals[0] === 2) return { name: 'PAIR', damage: 15, color: '#6b7280' };
  return { name: 'HIGH CARD', damage: Math.max(...dice), color: '#4b5563' };
}

function buildEnemy(round) {
  return {
    name: `Shadow Lv.${round}`,
    maxHp: 40 + round * 20,
    attack: 8 + round * 3,
  };
}

export default function GameScreen({ onGameOver }) {
  const [round, setRound] = useState(1);
  const [playerHp, setPlayerHp] = useState(PLAYER_MAX_HP);
  const [totalScore, setTotalScore] = useState(0);
  const [dice, setDice] = useState([1, 1, 1, 1, 1]);
  const [held, setHeld] = useState([false, false, false, false, false]);
  const [rollsUsed, setRollsUsed] = useState(0);
  const [enemy, setEnemy] = useState(buildEnemy(1));
  const [enemyHp, setEnemyHp] = useState(buildEnemy(1).maxHp);
  const [battleLog, setBattleLog] = useState([]);

  const combo = rollsUsed > 0 ? evaluateHand(dice) : null;
  const canRoll = rollsUsed < MAX_ROLLS;
  const canAttack = rollsUsed > 0;

  function handleRoll() {
    if (!canRoll) return;
    const newDice = dice.map((d, i) => (held[i] ? d : rollDie()));
    setDice(newDice);
    setRollsUsed((r) => r + 1);
  }

  function toggleHold(index) {
    if (rollsUsed === 0 || rollsUsed >= MAX_ROLLS) return;
    setHeld((h) => h.map((v, i) => (i === index ? !v : v)));
  }

  function handleAttack() {
    if (!canAttack) return;

    const currentCombo = evaluateHand(dice);
    const newEnemyHp = Math.max(0, enemyHp - currentCombo.damage);
    const newPlayerHp = Math.max(0, playerHp - enemy.attack);
    const newTotalScore = totalScore + currentCombo.damage;

    const logs = [
      `⚔️  ${currentCombo.name} → ${currentCombo.damage} dmg dealt`,
      `💢  ${enemy.name} hits you for ${enemy.attack}`,
    ];

    if (newPlayerHp <= 0) {
      setBattleLog(logs);
      onGameOver(newTotalScore, round);
      return;
    }

    setTotalScore(newTotalScore);

    if (newEnemyHp <= 0) {
      const nextRound = round + 1;
      const nextEnemy = buildEnemy(nextRound);
      const healedHp = Math.min(PLAYER_MAX_HP, newPlayerHp + HEAL_PER_ROUND);
      logs.unshift(`⭐  ${enemy.name} defeated! Round ${nextRound} — +${HEAL_PER_ROUND} HP`);
      setRound(nextRound);
      setEnemy(nextEnemy);
      setEnemyHp(nextEnemy.maxHp);
      setPlayerHp(healedHp);
    } else {
      setEnemyHp(newEnemyHp);
      setPlayerHp(newPlayerHp);
    }

    setBattleLog((prev) => [...logs, ...prev].slice(0, 6));
    setDice([1, 1, 1, 1, 1]);
    setHeld([false, false, false, false, false]);
    setRollsUsed(0);
  }

  const playerHpPct = playerHp / PLAYER_MAX_HP;
  const playerBarColor = playerHpPct < 0.3 ? '#e94560' : playerHpPct < 0.6 ? '#f59e0b' : '#10b981';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} bounces={false}>
        <View style={styles.header}>
          <Text style={styles.roundLabel}>ROUND {round}</Text>
          <Text style={styles.scoreLabel}>Score: {totalScore}</Text>
        </View>

        <EnemyBar enemy={enemy} hp={enemyHp} />

        <View style={styles.playerHpRow}>
          <Text style={styles.playerHpLabel}>❤️  {playerHp} HP</Text>
          <View style={styles.playerBarBg}>
            <View
              style={[
                styles.playerBarFill,
                { width: `${playerHpPct * 100}%`, backgroundColor: playerBarColor },
              ]}
            />
          </View>
        </View>

        <DiceRoller dice={dice} held={held} rolled={rollsUsed > 0} onToggle={toggleHold} />

        {combo && <ComboDisplay combo={combo} />}

        <Text style={styles.rollsLeft}>
          {rollsUsed === 0
            ? 'Roll to start your turn'
            : rollsUsed < MAX_ROLLS
            ? `${MAX_ROLLS - rollsUsed} reroll${MAX_ROLLS - rollsUsed > 1 ? 's' : ''} remaining`
            : 'No rerolls left — attack!'}
        </Text>

        <View style={styles.buttonRow}>
          {canRoll && (
            <TouchableOpacity style={styles.rollBtn} onPress={handleRoll} activeOpacity={0.8}>
              <Text style={styles.rollBtnText}>
                {rollsUsed === 0 ? '🎲  ROLL' : '🔄  REROLL'}
              </Text>
            </TouchableOpacity>
          )}
          {canAttack && (
            <TouchableOpacity
              style={[styles.attackBtn, !canRoll && styles.attackBtnWide]}
              onPress={handleAttack}
              activeOpacity={0.8}
            >
              <Text style={styles.attackBtnText}>⚔️  ATTACK</Text>
            </TouchableOpacity>
          )}
        </View>

        {battleLog.length > 0 && (
          <View style={styles.logBox}>
            {battleLog.map((entry, i) => (
              <Text key={i} style={[styles.logEntry, { opacity: Math.max(0.2, 1 - i * 0.15) }]}>
                {entry}
              </Text>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scroll: {
    padding: 16,
    paddingTop: 20,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  roundLabel: {
    color: '#e94560',
    fontWeight: '900',
    fontSize: 20,
    letterSpacing: 3,
  },
  scoreLabel: {
    color: '#a0a0c0',
    fontSize: 15,
    fontWeight: '600',
  },
  playerHpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  playerHpLabel: {
    color: '#c0c0d8',
    fontSize: 13,
    fontWeight: '600',
    width: 80,
  },
  playerBarBg: {
    flex: 1,
    height: 10,
    backgroundColor: '#16213e',
    borderRadius: 5,
    overflow: 'hidden',
  },
  playerBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  rollsLeft: {
    color: '#6b7280',
    fontSize: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
    marginVertical: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
    marginBottom: 14,
  },
  rollBtn: {
    flex: 1,
    backgroundColor: '#0f3460',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1e4d8c',
  },
  rollBtnText: {
    color: '#e0e0f0',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
  },
  attackBtn: {
    flex: 1,
    backgroundColor: '#e94560',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  attackBtnWide: {
    flex: 2,
  },
  attackBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
  },
  logBox: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  logEntry: {
    color: '#a0a0c0',
    fontSize: 13,
    marginBottom: 4,
    lineHeight: 20,
  },
});
