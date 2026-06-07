import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';
import { generateEnemy, simulateTurn } from '../utils/nameEngine';
import HeroCard from '../components/HeroCard';
import BattleLog from '../components/BattleLog';

const BATTLE_DELAY = 900;

export default function BattleScreen({ navigation, route }) {
  const { hero } = route.params;
  const [playerState, setPlayerState] = useState({ ...hero });
  const [enemy, setEnemy] = useState(() => generateEnemy(1));
  const [log, setLog] = useState([{ text: `⚔️  ${hero.name} vs ${generateEnemy(1).name} — FIGHT!`, type: 'system' }]);
  const [phase, setPhase] = useState('idle');
  const [round, setRound] = useState(1);
  const [battleOver, setBattleOver] = useState(false);
  const [shakeAnim] = useState(new Animated.Value(0));

  const playerRef = useRef(playerState);
  const enemyRef = useRef(enemy);
  playerRef.current = playerState;
  enemyRef.current = enemy;

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 4, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const addLog = (text, type = 'player') => {
    setLog(prev => [...prev, { text, type }]);
  };

  const endBattle = useCallback((won) => {
    setBattleOver(true);
    setTimeout(() => {
      navigation.navigate('Result', {
        won,
        hero: playerRef.current,
        enemy: enemyRef.current,
        rounds: round,
      });
    }, 1200);
  }, [navigation, round]);

  const executeTurn = useCallback(() => {
    if (phase !== 'idle' || battleOver) return;
    setPhase('running');

    const p = playerRef.current;
    const e = enemyRef.current;

    const playerFirst = p.speed >= e.speed;

    const first = playerFirst ? p : e;
    const second = playerFirst ? e : p;
    const firstIsPlayer = playerFirst;

    const r1 = simulateTurn(first, second);

    if (firstIsPlayer) {
      addLog(`⚔️  ${p.name} hits for ${r1.damage} dmg!`, 'player');
      shake();
      const newEnemyHp = r1.newHp;
      setEnemy(prev => ({ ...prev, hp: newEnemyHp }));
      enemyRef.current = { ...enemyRef.current, hp: newEnemyHp };

      if (newEnemyHp <= 0) {
        addLog(`✨  ${e.name} is defeated!`, 'system');
        setPhase('idle');
        setRound(r => r + 1);
        endBattle(true);
        return;
      }
    } else {
      addLog(`💥  ${e.name} strikes for ${r1.damage} dmg!`, 'enemy');
      shake();
      const newPlayerHp = r1.newHp;
      setPlayerState(prev => ({ ...prev, hp: newPlayerHp }));
      playerRef.current = { ...playerRef.current, hp: newPlayerHp };

      if (newPlayerHp <= 0) {
        addLog(`💀  ${p.name} has fallen...`, 'system');
        setPhase('idle');
        endBattle(false);
        return;
      }
    }

    setTimeout(() => {
      const p2 = playerRef.current;
      const e2 = enemyRef.current;
      const r2 = simulateTurn(second, first);

      if (firstIsPlayer) {
        addLog(`💥  ${e2.name} counters for ${r2.damage} dmg!`, 'enemy');
        shake();
        const newPlayerHp = r2.newHp;
        setPlayerState(prev => ({ ...prev, hp: newPlayerHp }));
        playerRef.current = { ...playerRef.current, hp: newPlayerHp };

        if (newPlayerHp <= 0) {
          addLog(`💀  ${p2.name} has fallen...`, 'system');
          setPhase('idle');
          endBattle(false);
          return;
        }
      } else {
        addLog(`⚔️  ${p2.name} hits for ${r2.damage} dmg!`, 'player');
        shake();
        const newEnemyHp = r2.newHp;
        setEnemy(prev => ({ ...prev, hp: newEnemyHp }));
        enemyRef.current = { ...enemyRef.current, hp: newEnemyHp };

        if (newEnemyHp <= 0) {
          addLog(`✨  ${e2.name} is defeated!`, 'system');
          setPhase('idle');
          setRound(r => r + 1);
          endBattle(true);
          return;
        }
      }

      addLog(`— Round ${round} complete —`, 'system');
      setRound(r => r + 1);
      setPhase('idle');
    }, BATTLE_DELAY);
  }, [phase, battleOver, round, endBattle]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.roundText}>ROUND {round}</Text>
        </View>

        <Animated.View style={[styles.fighters, { transform: [{ translateX: shakeAnim }] }]}>
          <HeroCard fighter={playerState} isEnemy={false} />
          <View style={styles.vs}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          <HeroCard fighter={enemy} isEnemy={true} />
        </Animated.View>

        <BattleLog entries={log} />

        <TouchableOpacity
          style={[styles.attackBtn, (phase === 'running' || battleOver) && styles.attackBtnDisabled]}
          onPress={executeTurn}
          disabled={phase === 'running' || battleOver}
          activeOpacity={0.8}
        >
          <Text style={styles.attackBtnText}>
            {battleOver ? '⌛  FINISHING...' : phase === 'running' ? '⚔️  ATTACKING...' : '⚔️  ATTACK'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fleeBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.fleeBtnText}>🏃  FLEE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0a0a1a' },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  topBar: { alignItems: 'center', marginBottom: 8 },
  roundText: { color: '#6c63ff', fontSize: 13, fontWeight: '800', letterSpacing: 3 },
  fighters: { flexDirection: 'row', alignItems: 'flex-start' },
  vs: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingTop: 30,
  },
  vsText: { color: '#f59e0b', fontSize: 14, fontWeight: '900' },
  attackBtn: {
    backgroundColor: '#6c63ff',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  attackBtnDisabled: { backgroundColor: '#2a2a4a' },
  attackBtnText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 2 },
  fleeBtn: { alignItems: 'center', paddingVertical: 14 },
  fleeBtnText: { color: '#666', fontSize: 13, fontWeight: '600', letterSpacing: 1 },
});
