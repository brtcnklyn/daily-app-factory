import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, PanResponder, SafeAreaView } from 'react-native';
import GameGrid from '../components/GameGrid';
import HUD from '../components/HUD';

const GRID_SIZE = 5;
const EMPTY = 0;
const PLAYER = 1;
const ENEMY = 2;
const COIN = 3;
const SWIPE_MIN = 20;
const COINS_PER_LEVEL = 5;

function initLevel(levelNum) {
  const mid = Math.floor(GRID_SIZE / 2);
  const taken = new Set([`${mid},${mid}`]);

  const pickCell = () => {
    let r, c;
    do {
      r = Math.floor(Math.random() * GRID_SIZE);
      c = Math.floor(Math.random() * GRID_SIZE);
    } while (taken.has(`${r},${c}`));
    taken.add(`${r},${c}`);
    return { row: r, col: c };
  };

  const numEnemies = Math.min(2 + Math.floor((levelNum - 1) / 2), 8);
  const enemies = Array.from({ length: numEnemies }, pickCell);
  const coins = Array.from({ length: COINS_PER_LEVEL }, pickCell);

  const grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(EMPTY));
  grid[mid][mid] = PLAYER;
  enemies.forEach(({ row, col }) => { grid[row][col] = ENEMY; });
  coins.forEach(({ row, col }) => { grid[row][col] = COIN; });

  return {
    grid,
    player: { row: mid, col: mid },
    enemies,
    coinsLeft: COINS_PER_LEVEL,
  };
}

const DIR_DELTA = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

export default function GameScreen({ onGameOver, onHome }) {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gs, setGs] = useState(() => initLevel(1));

  const gsRef = useRef(gs);
  const scoreRef = useRef(0);
  const levelRef = useRef(1);

  useEffect(() => {
    gsRef.current = gs;
  }, [gs]);

  // Updated on every render so panResponder always calls latest version
  const handleSwipeRef = useRef(null);
  handleSwipeRef.current = (dir) => {
    const { grid, player, enemies, coinsLeft } = gsRef.current;
    const curScore = scoreRef.current;
    const curLevel = levelRef.current;

    const [dr, dc] = DIR_DELTA[dir];
    const nr = player.row + dr;
    const nc = player.col + dc;

    if (nr < 0 || nr >= GRID_SIZE || nc < 0 || nc >= GRID_SIZE) return;

    const cell = grid[nr][nc];
    if (cell === ENEMY) {
      onGameOver(curScore);
      return;
    }

    let newCoins = coinsLeft;
    let newScore = curScore;
    if (cell === COIN) {
      newCoins--;
      newScore += 10;
    }

    const newGrid = grid.map(row => [...row]);
    newGrid[player.row][player.col] = EMPTY;
    newGrid[nr][nc] = PLAYER;
    const newPlayer = { row: nr, col: nc };

    // Move each enemy one step toward the player
    let killed = false;
    const newEnemies = enemies.map(e => {
      if (killed) return e;

      const edr = newPlayer.row - e.row;
      const edc = newPlayer.col - e.col;

      // Move along the axis with the greater distance
      let mr = 0, mc = 0;
      if (Math.abs(edr) >= Math.abs(edc)) mr = Math.sign(edr);
      else mc = Math.sign(edc);

      const er = e.row + mr;
      const ec = e.col + mc;

      if (er < 0 || er >= GRID_SIZE || ec < 0 || ec >= GRID_SIZE) return e;

      const target = newGrid[er][ec];
      if (target === PLAYER) {
        killed = true;
        return { row: er, col: ec };
      }
      if (target === EMPTY) {
        newGrid[e.row][e.col] = EMPTY;
        newGrid[er][ec] = ENEMY;
        return { row: er, col: ec };
      }
      // Blocked by coin, another enemy, or wall — stay put
      return e;
    });

    if (killed) {
      onGameOver(newScore);
      return;
    }

    if (newCoins === 0) {
      const nextLevel = curLevel + 1;
      levelRef.current = nextLevel;
      scoreRef.current = newScore;
      setLevel(nextLevel);
      setScore(newScore);
      const fresh = initLevel(nextLevel);
      gsRef.current = fresh;
      setGs(fresh);
      return;
    }

    scoreRef.current = newScore;
    const updated = { grid: newGrid, player: newPlayer, enemies: newEnemies, coinsLeft: newCoins };
    gsRef.current = updated;
    setScore(newScore);
    setGs(updated);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, { dx, dy }) => {
        if (Math.abs(dx) > Math.abs(dy)) {
          if (Math.abs(dx) >= SWIPE_MIN) {
            handleSwipeRef.current(dx > 0 ? 'right' : 'left');
          }
        } else {
          if (Math.abs(dy) >= SWIPE_MIN) {
            handleSwipeRef.current(dy > 0 ? 'down' : 'up');
          }
        }
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container} {...panResponder.panHandlers}>
        <HUD score={score} level={level} coinsLeft={gs.coinsLeft} onHome={onHome} />
        <View style={styles.gridWrapper}>
          <GameGrid grid={gs.grid} />
        </View>
        <Text style={styles.hint}>kaydır → hareket et</Text>
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
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  gridWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    fontSize: 13,
    color: '#2a3a4a',
    fontStyle: 'italic',
  },
});
