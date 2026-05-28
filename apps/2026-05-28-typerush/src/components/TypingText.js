import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TypingText({ targetText, typedText }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {targetText.split('').map((char, index) => {
          let charColor = '#C4B5FD';
          let bgColor = 'transparent';

          if (index < typedText.length) {
            if (typedText[index] === char) {
              charColor = '#065F46';
              bgColor = '#D1FAE5';
            } else {
              charColor = '#991B1B';
              bgColor = '#FEE2E2';
            }
          } else if (index === typedText.length) {
            bgColor = '#EDE9FE';
            charColor = '#4C1D95';
          }

          return (
            <Text key={index} style={{ color: charColor, backgroundColor: bgColor, fontSize: 22 }}>
              {char}
            </Text>
          );
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#E9D5FF',
  },
  text: {
    fontSize: 22,
    lineHeight: 38,
    letterSpacing: 0.3,
  },
});
