import React, { useRef, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

export default function BattleLog({ entries }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
  }, [entries]);

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        {entries.map((entry, i) => (
          <Text key={i} style={[styles.entry, entry.type === 'enemy' ? styles.enemy : entry.type === 'system' ? styles.system : styles.player]}>
            {entry.text}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0a0a1a',
    borderRadius: 12,
    padding: 10,
    height: 130,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#1e1e3a',
  },
  entry: {
    fontSize: 12,
    marginVertical: 2,
    fontFamily: 'monospace',
  },
  player: {
    color: '#a5b4fc',
  },
  enemy: {
    color: '#fca5a5',
  },
  system: {
    color: '#fbbf24',
    fontWeight: '700',
  },
});
