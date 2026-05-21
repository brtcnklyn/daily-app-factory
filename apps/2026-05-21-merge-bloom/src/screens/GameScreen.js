import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MergeGrid from '../components/MergeGrid';
import { EMOJIS } from '../components/EmojiCell';
import { updateBestScore, getBestScore } from '../store';

const GRID_SIZE = 5;
const MAX_LEVEL = EMOJIS.length - 1;

function createEmptyGrid() {
  return Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(null));
}

function getEmptyCells(grid) {
  const empty = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === null) empty.push({ r, c });
    }
  }
  return empty;
}

function spawnCell(grid, level = 0) {
  const empty = getEmptyCells(grid);
  if (empty.length === 0) return grid;
  const { r, c } = empty[Math.floor(Math.random() * empty.length)];
  const next = grid.map((row) => [...row]);
  next[r][c] = level;
  return next;
}

function initGrid() {
  let grid = createEmptyGrid();
  for (let i = 0; i < 6; i++) {
    grid = spawnCell(grid, Math.random() < 0.8 ? 0 : 1);
  }
  return grid;
}

function isAdjacent(r1, c1, r2, c2) {
  return Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
}

function isBoardFull(grid) {
  return getEmptyCells(grid).length === 0;
}

function hasMoves(grid) {
  if (!isBoardFull(grid)) return true;
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (c + 1 < GRID_SIZE && grid[r][c] === grid[r][c + 1]) return true;
      if (r + 1 < GRID_SIZE && grid[r][c] === grid[r + 1][c]) return true;
    }
  }
  return false;
}

export default function GameScreen({ navigation }) {
  const [grid, setGrid] = useState(initGrid);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const triggerGameOver = useCallback(
    (finalScore, finalGrid) => {
      const prevBest = getBestScore();
      updateBestScore(finalScore);
      setGrid(finalGrid);
      setSelected(null);
      setTimeout(() => {
        navigation.replace('Score', { score: finalScore, prevBest });
      }, 400);
    },
    [navigation]
  );

  const handleCellPress = useCallback(
    (row, col) => {
      if (selected === null) {
        if (grid[row][col] !== null) {
          setSelected({ row, col });
        }
        return;
      }

      const { row: sr, col: sc } = selected;

      if (sr === row && sc === col) {
        setSelected(null);
        return;
      }

      if (!isAdjacent(sr, sc, row, col)) {
        setSelected(grid[row][col] !== null ? { row, col } : null);
        return;
      }

      const next = grid.map((r) => [...r]);

      if (next[row][col] === null) {
        next[row][col] = next[sr][sc];
        next[sr][sc] = null;
        setGrid(next);
        setSelected(null);
        return;
      }

      if (next[row][col] === next[sr][sc]) {
        const mergedLevel = Math.min(next[sr][sc] + 1, MAX_LEVEL);
        const points = Math.pow(2, mergedLevel) * 10;
        next[row][col] = mergedLevel;
        next[sr][sc] = null;
        const newScore = score + points;
        setScore(newScore);

        const spawned = spawnCell(next);
        if (!hasMoves(spawned)) {
          triggerGameOver(newScore, spawned);
        } else {
          setGrid(spawned);
          setSelected(null);
        }
        return;
      }

      setSelected({ row, col });
    },
    [grid, selected, score, triggerGameOver]
  );

  const confirmGiveUp = () => {
    Alert.alert('Give Up?', 'End the game and see your score?', [
      { text: 'Keep Playing', style: 'cancel' },
      {
        text: 'Give Up',
        style: 'destructive',
        onPress: () => {
          const prevBest = getBestScore();
          updateBestScore(score);
          navigation.replace('Score', { score, prevBest });
        },
      },
    ]);
  };

  const restartGame = () => {
    setGrid(initGrid());
    setSelected(null);
    setScore(0);
  };

  const selectedEmoji =
    selected !== null && grid[selected.row][selected.col] !== null
      ? EMOJIS[grid[selected.row][selected.col]]
      : null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={confirmGiveUp} style={styles.iconBtn}>
          <Text style={styles.iconBtnText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.scoreValue}>{score.toLocaleString()}</Text>
        </View>

        <TouchableOpacity onPress={restartGame} style={styles.iconBtn}>
          <Text style={styles.iconBtnText}>↺</Text>
        </TouchableOpacity>
      </View>

      <MergeGrid grid={grid} selected={selected} onCellPress={handleCellPress} />

      <View style={styles.hintBox}>
        {selectedEmoji ? (
          <Text style={styles.hintText}>
            {selectedEmoji} selected — tap an adjacent {selectedEmoji} to merge!
          </Text>
        ) : (
          <Text style={styles.hintText}>Tap a plant to select it</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fff4',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  iconBtn: {
    width: 46,
    height: 46,
    backgroundColor: '#fff',
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconBtnText: {
    fontSize: 20,
    color: '#52b788',
    fontWeight: '600',
  },
  scoreBox: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 36,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  scoreLabel: {
    fontSize: 11,
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  scoreValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1b4332',
  },
  hintBox: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  hintText: {
    fontSize: 14,
    color: '#74c69d',
    textAlign: 'center',
    lineHeight: 20,
  },
});
