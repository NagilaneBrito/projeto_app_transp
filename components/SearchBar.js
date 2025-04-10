
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function SearchBar() {
  return (
    <View style={styles.searchBarContainer}>
      <TextInput style={styles.searchBar} placeholder="Barra de Pesquisa" />
      <Text style={styles.searchIcon}>🔍</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '90%',
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchIcon: {
    fontSize: 20,
  },
});
