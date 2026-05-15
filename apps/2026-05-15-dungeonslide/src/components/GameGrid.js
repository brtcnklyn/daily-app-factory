import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Tile from './Tile';

const GRID_SIZE = 5;
const INNER_PADDING = 10;
const TILE_GAP = 5;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_WIDTH = Math.min(SCREEN_WIDTH - 32, 360);
const TILE_SIZE = Math.floor(
  (GRID_WIDTH - INNER_PADDING * 2 - TILE_GAP * (GRID_SIZE - 1)) / GRID_SIZE
);

export default function GameGrid({ grid }) {
  return (
    <View style={styles.grid}>
      {grid.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={[styles.row, rowIndex < GRID_SIZE - 1 && styles.rowGap]}
        >
          {row.map((cell, colIndex) => (
            <View
              key={colIndex}
              style={colIndex < GRID_SIZE - 1 && styles.tileGap}
            >
              <Tile type={cell} size={TILE_SIZE} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    backgroundColor: '#0a0a1a',
    borderRadius: 16,
    padding: INNER_PADDING,
    borderWidth: 1,
    borderColor: '#1e1e3a',
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
  },
  row: {
    flexDirection: 'row',
  },
  rowGap: {
    marginBottom: TILE_GAP,
  },
  tileGap: {
    marginRight: TILE_GAP,
  },
});
