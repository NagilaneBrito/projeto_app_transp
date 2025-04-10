import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

export default function BotaoMenu({ texto, imagem }) {
  return (
    <TouchableOpacity style={styles.button}>
      <View style={styles.container}>
        {imagem && <Image source={imagem} style={styles.icone} />}
        <Text style={styles.texto}>{texto}</Text>
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
  icone: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  texto: {
    color: '#fff',
    fontSize: 18,
  },
});
