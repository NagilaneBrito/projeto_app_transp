import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import fotoOnibus from "../assets/bus.webp";
import fotoCarrinho from "../assets/carrinho_supermercado.jpg";

const listaOnibus = [
  {
    numero: "1021",
    rota: 'Almenara - Teófilo Otoni',
    vagas: '10',
    horarios: "07:30 - 12:00",
  },
  {
    numero: "3780",
    rota: 'Itaobim - Pedra Azul',
    vagas: '20',
    horarios: "10:30 - 12:00",
  },
  {
    numero: "5412",
    rota: 'Teófilo Otoni - Governador Valadares',
    vagas: '40',
    horarios: "13:30 - 15:00",
  },
  {
    numero: "2267",
    rota: 'Almenara - Teófilo Otoni',
    vagas: '10',
    horarios: "08:00 - 12:00",
  },  
];

export default function ListaOnibus() {
  const navigation = useNavigation();

  return (
    <FlatList
      data={listaOnibus}
      keyExtractor={item => item.numero}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.rowContainer}>
            <View style={styles.descrition}>
              <Image source={fotoOnibus} style={styles.imagem} />
              <View style={styles.infoText}>
                <Text style={styles.text}>Rota: {item.rota}</Text>
                <Text style={styles.text}>Vagas Disponíveis: {item.vagas}</Text>
                <Text style={styles.text}>Horários: {item.horarios}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Carrinho')}>
              <Image source={fotoCarrinho} style={styles.carrinho} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    height: 3,
    marginTop: 3,
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 2,
    shadowRadius: 10,
  },
  imagem: {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  descrition: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carrinho: {
    width: 60,
    height: 60,
  },
  
  text: {
    fontSize: 16,
    fontColor: '#0000',
  },
  infoText: {
    marginLeft: 12,
    flex: 1,
  },
  
});