// HomeScreen.js
import React from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import SearchBar from '../components/SearchBar';
import MenuButton from '../components/MenuButton';

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require('../assets/cuidados-na-estrada.png.webp')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <SearchBar />
        <View style={styles.buttonContainer}>
          <MenuButton icon="bus-outline" label="ÔNIBUS" />
          <MenuButton icon="time-outline" label="HORÁRIOS" />
          <MenuButton icon="help-circle-outline" label="AJUDA" />
          <MenuButton icon="information-circle-outline" label="SOBRE" />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    flexGrow: 1,
  },
  buttonContainer: {
    width: '90%',
    alignItems: 'center',
    marginTop: 250,
  },
});
