import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StreakBadge({ streak }) {
  if (!streak || streak === 0) return null;

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>
        {'🔥'} {streak} day{streak !== 1 ? 's' : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#1A0F00',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3A2A0A',
  },
  text: {
    color: '#FBBF24',
    fontSize: 13,
    fontWeight: '700',
  },
});
