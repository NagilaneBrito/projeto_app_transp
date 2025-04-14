import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BotaoMenu({ icon, label }) {
  return (
    <TouchableOpacity style={styles.button}>
      <View style={styles.container}>
        <Ionicons name={icon} size={30} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0d4412',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginVertical: 6,
    width: '90%',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
