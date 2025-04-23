import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import Formulario from './Formulario';

export default function ReservaPassagem({ navigation }) {
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.painel}>
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />
          <Text style={styles.title}>RESERVA DE PASSAGEM</Text>
          <Ionicons
            name="home"
            size={24}
            color="black"
            onPress={() => navigation.navigate('Home')}
            style={styles.homeButton}
          />
        </View>
        <View style={styles.formulario}>
          <Formulario navigation={navigation} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  painel: {
    flex: 1,
    backgroundColor: '#0d4412',
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: '100%',
    position: 'relative',
    marginBottom: 10, 
    marginTop: 30,
  },
  formulario: {
    top: -10,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  homeButton: {
    position: 'absolute',
    right: 20,
  },
  title: {
    fontSize: 24,
    color: '#000',
  },
});