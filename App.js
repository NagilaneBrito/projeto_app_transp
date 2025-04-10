import React from 'react';
import { View, TextInput, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-web';
import BotaoMenu from './components/BotaoMenu.js';

import fotLupa from './assets/lupa.jpg';
import fotOnibus from './assets/onibus.png';
import fotHorario from './assets/relogio.png';
import fotAjuda from './assets/ajuda.png';
import fotSobre from './assets/alerta.png';

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
          {/* Barra de pesquisa */}
          <View style={styles.searchContainer}>
            <ImageBackground source={fotLupa} style={styles.icon}/>
            <TextInput
              placeholder="Barra de Pesquisa"
              placeholderTextColor="#000"
              style={styles.searchInput}
            />
          </View>

          {/* Botões do menu */}
          <View style={styles.menuContainer}>
            <BotaoMenu imagem={fotOnibus} texto="ÔNIBUS" />
            <BotaoMenu imagem={fotHorario} texto="HORÁRIOS" />
            <BotaoMenu imagem={fotAjuda} texto="AJUDA" />
            <BotaoMenu imagem={fotSobre} texto="SOBRE" />
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
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },  
  searchInput: {
    color: '#000',
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





