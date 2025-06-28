import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Pagina_Inicial from './components/PaginaInicial'; 
import Onibus from './components/BotaoOnibus'; 
import TelaOrigem from './components/TelaOrigem';
import ReservadePassagem from './components/ReservadePassagem';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Pagina_Inicial} />
        <Stack.Screen name="Onibus" component={Onibus} />
        <Stack.Screen name="TelaOrigem" component={TelaOrigem} />
        <Stack.Screen name="Carrinho" component={ReservadePassagem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}