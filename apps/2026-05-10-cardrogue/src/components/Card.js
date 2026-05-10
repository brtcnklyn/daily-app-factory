import React, { useRef } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Animated } from 'react-native';

export default function Card({ card, onPress, disabled }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  function handlePress() {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.90, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start(() => onPress(card));
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.9}
      style={styles.touchable}
    >
      <Animated.View
        style={[
          styles.card,
          disabled && styles.cardDisabled,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View style={[styles.colorBar, { backgroundColor: card.color }]} />
        <Text style={styles.icon}>{card.icon}</Text>
        <Text style={styles.name}>{card.name}</Text>
        <Text style={styles.description}>{card.description}</Text>
        <View style={[styles.typeBadge, { backgroundColor: card.color + '33' }]}>
          <Text style={[styles.typeText, { color: card.color }]}>
            {card.type.toUpperCase()}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a4e',
    minHeight: 145,
  },
  cardDisabled: {
    opacity: 0.45,
  },
  colorBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  icon: {
    fontSize: 34,
    marginTop: 10,
    marginBottom: 7,
  },
  name: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 5,
  },
  description: {
    color: '#7777aa',
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 14,
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 'auto',
  },
  typeText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
