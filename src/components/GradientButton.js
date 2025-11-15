
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function GradientButton({ title, style, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={style}>
      <LinearGradient colors={['#15C16B', '#09324A']} start={{x:0,y:0}} end={{x:1,y:0}} style={styles.gradient}>
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width:0, height:6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4
  },
  text: { color: '#fff', fontWeight: '600', fontSize: 16 }
});
