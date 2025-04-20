import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Maps from './Maps';
import ListaOnibus from './BusList';

export default function BotaoOnibus({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons 
          name="arrow-back" 
          size={24} 
          color="black" 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        />
        <Text style={styles.title}>ORIGEM</Text>
        <Ionicons 
          name="home" 
          size={24} 
          color="black" 
          onPress={() => navigation.navigate('Home')}  
          style={styles.homeButton}  
        />
      </View>
      
      {/* Mapa */}
      <View style={styles.mapContainer}>
        <Maps />
      </View>
      
      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchBar} 
          placeholder="Barra de Pesquisa" 
        />
        <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
      </View>

      {/* Lista de ônibus */}
      <View style={styles.listContainer}>
        <ListaOnibus />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  },
  mapContainer: {
    height: 300,
    width: '100%',
  },
  searchContainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 70,
    left: 20,
    right: 20,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  searchBar: {
    flex: 1,
    height: 40,
  },
  searchIcon: {
    marginLeft: 10,
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
  listContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffffee',
  },
});