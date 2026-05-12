import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HabitItem({ habit, onToggle }) {
  return (
    <TouchableOpacity
      style={[styles.container, habit.completed && styles.containerDone]}
      onPress={onToggle}
      activeOpacity={0.75}
    >
      <Text style={styles.icon}>{habit.icon}</Text>
      <Text style={[styles.name, habit.completed && styles.nameDone]}>
        {habit.name}
      </Text>
      <View style={[styles.checkbox, habit.completed && styles.checkboxDone]}>
        {habit.completed && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 12,
  },
  containerDone: {
    backgroundColor: '#EDE9FE',
  },
  icon: {
    fontSize: 26,
    marginRight: 14,
  },
  name: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },
  nameDone: {
    color: '#7C3AED',
    textDecorationLine: 'line-through',
    opacity: 0.65,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
