import React from 'react';
import { View, TextInput, ImageBackground, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import BotaoMenu from './components/BotaoMenu';
import BotaoOnibus from './components/BotaoOnibus';
import TelaOrigem from './components/TelaOrigem';
import ReservadePassagem from './components/ReservadePassagem';

const Stack = createStackNavigator();

function Pagina_inicial({ navigation }) {
  return (
    <View style={[styles.painel, { flex: 1 }]}>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ width: '100%' }}
      >
        <View style={{ height: '100%', position: 'relative' }}>
          <ImageBackground
            source={require('./assets/cuidados-na-estrada.png.webp')}
            style={[styles.background, { position: 'absolute', height: '80%' }]}
            resizeMode="cover"
          >
            <View style={styles.overlay}>
              {/* Componentes */}
              <View style={styles.searchContainer}>
                <TextInput style={styles.searchBar} placeholder="Barra de Pesquisa" />
                <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
              </View>
              <View style={styles.menuContainer}>
                <BotaoMenu icon="bus-outline" label="ÔNIBUS" onPress={() => navigation.navigate('Onibus')} />
                <BotaoMenu icon="time-outline" label="HORÁRIOS" />
                <BotaoMenu icon="help-circle-outline" label="AJUDA" />
                <BotaoMenu icon="information-circle-outline" label="SOBRE" />
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Pagina_inicial} />
        <Stack.Screen name="Onibus" component={BotaoOnibus} />
        <Stack.Screen name="TelaOrigem" component={TelaOrigem} />
        <Stack.Screen name="Carrinho" component={ReservadePassagem} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#D9D9D9',
    flex: 1,
    marginTop: 30,
    width: '100%',
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
    width: '115%',
    backgroundColor: '#ffffffee',
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: "#ffffffee",
    shadowOffset: {width: 0, height: -40},
    shadowOpacity: 4,
    shadowRadius: 50,
  },
 
});