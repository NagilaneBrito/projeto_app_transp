import React from 'react';
import { View, Text, TextInput, ImageBackground, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BotaoMenu from './components/BotaoMenu';

export default function App() {
  return (
    <ScrollView>
      <View style={styles.painel}>
        <ImageBackground
          source={require('./assets/cuidados-na-estrada.png.webp')} 
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <View style={styles.searchContainer}>
              <TextInput style={styles.searchBar} placeholder="Barra de Pesquisa" />
              <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
            </View>

            <View style={styles.menuContainer}>
              <BotaoMenu icon="bus-outline" label="ÔNIBUS" />
              <BotaoMenu icon="time-outline" label="HORÁRIOS" />
              <BotaoMenu icon="help-circle-outline" label="AJUDA" />
              <BotaoMenu icon="information-circle-outline" label="SOBRE" />
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#D9D9D9',
    flex: 1,
    marginTop: 30,
    width: '100%',
    height: '60%',
  },
  painel: {
    backgroundColor: '#0d4412',
    paddingBottom: 20,
  },
  overlay: {
    height: '100%',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingTop: 50,
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    height: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  searchBar: {
    color: '#000',
    flex: 1, 
  },
  searchIcon: {
    marginLeft: 10,
  },
  menuContainer: {
    marginTop: 200,
    width: '100%',
    backgroundColor: '#ffffffee',
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
  },
});
