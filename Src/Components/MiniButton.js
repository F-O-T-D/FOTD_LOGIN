import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { PRIMARY, WHITE } from '../Colors';

const MiniButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 80,
    padding: 10,
    backgroundColor: PRIMARY.DEFAULT,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: WHITE,
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default MiniButton;
