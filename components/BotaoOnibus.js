import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Maps from './Maps';

import BotaoMenu from './BotaoMenu';
import TelaOrigem from './TelaOrigem';


export default function BotaoOnibus({ navigation }) {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={[styles.painel]}>
        <View style={styles.header}>
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color="black" 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          />
          <Text style={styles.title}>ÔNIBUS</Text>
          <Ionicons 
            name="home" 
            size={24} 
            color="black" 
            onPress={() => navigation.navigate('Home')}  
            style={styles.homeButton}  
          />
        </View>
        {/* Mapa  */}
        <View style={styles.mapContainer}>
          <Maps />
        </View>  
        {/* Menu de Botões */}
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchBar} 
            placeholder="Barra de Pesquisa" 
          />
          <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
        </View>
        <View style={styles.menuContainer}>
          <BotaoMenu 
            icon="arrow-forward" 
            iconPosition="right" 
            label="ORIGEM"
            iconSize={28}
            onPress={() => navigation.navigate('TelaOrigem')}
          />
          <BotaoMenu 
            icon="arrow-back-outline" 
            iconPosition="left" 
            label="DESTINO" 
          />
        </View>
      </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  painel: {
    backgroundColor: '#0d4412',
    paddingBottom: 30,
    paddingTop: 10,
    height: 100,
    
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',  
    marginVertical: 20,
    width: '100%',
    position: 'relative',
    height: 55,  
  },
  mapContainer: {
    height: 500,
    width: '100%',
    overflow: 'relative',
    marginTop: -20,
   
  },
  searchContainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 100,
    left: '5%',
    right: '5%',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1, 
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
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
  },
  menuContainer: {
    marginTop: -100,
    paddingTop: 20,
    width: '100%',
    backgroundColor: '#ffffffee',
    alignItems: 'center',
    height: 200,
  },
});