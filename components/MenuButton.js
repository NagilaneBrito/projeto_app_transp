
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MenuButton({ icon, label }) {
  return (
    <TouchableOpacity style={styles.button}>
      <Ionicons name={icon} size={30} color="#fff" style={styles.icon} />
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0d4412',
    width: '100%',
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
