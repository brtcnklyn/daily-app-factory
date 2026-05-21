import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import EmojiCell from './EmojiCell';

const GRID_SIZE = 5;

export default function MergeGrid({ grid, selected, onCellPress }) {
  const { width } = useWindowDimensions();
  const gridWidth = Math.min(width - 32, 380);
  const cellSize = Math.floor((gridWidth - GRID_SIZE * 6 - 16) / GRID_SIZE);

  return (
    <View style={[styles.wrapper, { width: gridWidth }]}>
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <EmojiCell
              key={colIndex}
              level={cell}
              selected={
                selected !== null &&
                selected.row === rowIndex &&
                selected.col === colIndex
              }
              onPress={() => onCellPress(rowIndex, colIndex)}
              size={cellSize}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#d8f3dc',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
  },
});
