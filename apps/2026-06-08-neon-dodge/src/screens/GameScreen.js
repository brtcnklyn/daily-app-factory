import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Player, { PLAYER_SIZE } from '../components/Player';
import Obstacle, { OBSTACLE_HEIGHT } from '../components/Obstacle';
import ScoreDisplay from '../components/ScoreDisplay';

const { width: W, height: H } = Dimensions.get('window');
const LANES = 3;
const LW = W / LANES;
const OBSTACLE_WIDTH = LW - 20;
const BASE_SPEED = 10;
const TICK_MS = 50;
const SPAWN_INTERVAL_TICKS = 25;
const SCORE_INTERVAL_TICKS = 20;
const SPEED_UP_TICKS = 200;
const PLAYER_Y_CENTER = H - 185;

function makeInitialState() {
  return {
    playerLane: 1,
    obstacles: [],
    score: 0,
    speed: BASE_SPEED,
    ticks: 0,
    isOver: false,
    nextId: 0,
  };
}

export default function GameScreen({ navigate }) {
  const stateRef = useRef(makeInitialState());
  const [display, setDisplay] = useState(makeInitialState());

  const sync = () => {
    const s = stateRef.current;
    setDisplay({
      playerLane: s.playerLane,
      obstacles: [...s.obstacles],
      score: s.score,
      speed: s.speed,
      ticks: s.ticks,
      isOver: s.isOver,
      nextId: s.nextId,
    });
  };

  const moveLeft = () => {
    if (stateRef.current.isOver) return;
    stateRef.current.playerLane = Math.max(0, stateRef.current.playerLane - 1);
    sync();
  };

  const moveRight = () => {
    if (stateRef.current.isOver) return;
    stateRef.current.playerLane = Math.min(LANES - 1, stateRef.current.playerLane + 1);
    sync();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const s = stateRef.current;
      if (s.isOver) return;

      s.ticks++;

      if (s.ticks % SCORE_INTERVAL_TICKS === 0) s.score++;
      if (s.ticks % SPEED_UP_TICKS === 0) s.speed = Math.min(s.speed + 2, 26);

      if (s.ticks % SPAWN_INTERVAL_TICKS === 0) {
        s.obstacles.push({
          id: s.nextId++,
          lane: Math.floor(Math.random() * LANES),
          y: -OBSTACLE_HEIGHT,
        });
      }

      s.obstacles = s.obstacles
        .map(o => ({ ...o, y: o.y + s.speed }))
        .filter(o => o.y < H);

      const pTop = PLAYER_Y_CENTER - PLAYER_SIZE / 2;
      const pBottom = PLAYER_Y_CENTER + PLAYER_SIZE / 2;

      const hit = s.obstacles.some(o => {
        if (o.lane !== s.playerLane) return false;
        return o.y + OBSTACLE_HEIGHT > pTop && o.y < pBottom;
      });

      if (hit) s.isOver = true;

      sync();
    }, TICK_MS);

    return () => clearInterval(interval);
  }, []);

  const handleRestart = () => {
    stateRef.current = makeInitialState();
    sync();
  };

  const getLaneLeft = (lane) => lane * LW;
  const playerLeft = getLaneLeft(display.playerLane) + LW / 2 - PLAYER_SIZE / 2;
  const level = Math.floor((display.speed - BASE_SPEED) / 2) + 1;

  return (
    <View style={styles.container}>
      <ScoreDisplay score={display.score} level={level} />

      <View style={[styles.divider, { left: LW }]} />
      <View style={[styles.divider, { left: LW * 2 }]} />

      {display.obstacles.map((o, i) => (
        <Obstacle
          key={o.id}
          left={getLaneLeft(o.lane) + (LW - OBSTACLE_WIDTH) / 2}
          top={o.y}
          width={OBSTACLE_WIDTH}
          colorIndex={i % 3}
        />
      ))}

      <Player left={playerLeft} top={PLAYER_Y_CENTER - PLAYER_SIZE / 2} />

      <View style={styles.controls}>
        <TouchableOpacity style={styles.ctrlBtn} onPress={moveLeft} activeOpacity={0.7}>
          <Text style={styles.ctrlText}>◀</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ctrlBtn} onPress={moveRight} activeOpacity={0.7}>
          <Text style={styles.ctrlText}>▶</Text>
        </TouchableOpacity>
      </View>

      {display.isOver && (
        <View style={styles.overlay}>
          <Text style={styles.gameOverTitle}>GAME OVER</Text>
          <Text style={styles.finalScore}>{display.score}</Text>
          <Text style={styles.finalLabel}>seconds survived</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={handleRestart}>
            <Text style={styles.primaryBtnText}>RETRY</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.outlineBtn}
            onPress={() => navigate('leaderboard', { score: display.score })}
          >
            <Text style={styles.outlineBtnText}>LEADERBOARD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineBtn} onPress={() => navigate('home')}>
            <Text style={styles.outlineBtnText}>HOME</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  divider: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  controls: {
    position: 'absolute',
    bottom: 36,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 48,
  },
  ctrlBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,255,255,0.1)',
    borderWidth: 2,
    borderColor: 'rgba(0,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctrlText: {
    color: '#00ffff',
    fontSize: 30,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.88)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverTitle: {
    color: '#ff3355',
    fontSize: 52,
    fontWeight: 'bold',
    letterSpacing: 4,
    marginBottom: 12,
    textShadowColor: '#ff3355',
    textShadowRadius: 20,
    textShadowOffset: { width: 0, height: 0 },
  },
  finalScore: {
    color: '#00ffff',
    fontSize: 64,
    fontWeight: 'bold',
    textShadowColor: '#00ffff',
    textShadowRadius: 20,
    textShadowOffset: { width: 0, height: 0 },
  },
  finalLabel: {
    color: 'rgba(0,255,255,0.6)',
    fontSize: 16,
    marginBottom: 36,
    letterSpacing: 2,
  },
  primaryBtn: {
    backgroundColor: '#00ffff',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 220,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryBtnText: {
    color: '#0a0a1a',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  outlineBtn: {
    borderWidth: 2,
    borderColor: 'rgba(0,255,255,0.6)',
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 12,
    minWidth: 220,
    alignItems: 'center',
    marginBottom: 10,
  },
  outlineBtnText: {
    color: '#00ffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
