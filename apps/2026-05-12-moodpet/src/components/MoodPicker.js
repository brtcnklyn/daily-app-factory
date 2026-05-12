import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { MOOD_LIST } from '../store';

export default function MoodPicker({ onSelect, onClose }) {
  return (
    <Modal transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>How are you feeling?</Text>
          <Text style={styles.subtitle}>Your pet grows with how you feel 🐾</Text>

          <View style={styles.grid}>
            {MOOD_LIST.map((mood) => (
              <TouchableOpacity
                key={mood.value}
                style={[styles.option, { borderColor: mood.color }]}
                onPress={() => onSelect(mood)}
                activeOpacity={0.8}
              >
                <Text style={styles.emoji}>{mood.emoji}</Text>
                <Text style={styles.label}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: 44,
  },
  handle: {
    width: 44,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 28,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 2.5,
    backgroundColor: '#FAFAFA',
    marginHorizontal: 3,
  },
  emoji: {
    fontSize: 30,
    marginBottom: 6,
  },
  label: {
    fontSize: 10,
    color: '#374151',
    fontWeight: '700',
  },
});
