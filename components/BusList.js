import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

import fotoOnibus from '../assets/bus.webp';
import fotoCarrinho from '../assets/carrinho_supermercado.jpg';

export default function ListaOnibus() {
  const [rotas, setRotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  
  const checkTables = async () => {
  const { data, error } = await supabase
    .rpc('list_tables')
    .like('name', '%rotas%');
  
  console.log('Tabelas encontradas:', data);
  console.log('Erro:', error);
};


checkTables();

  const fetchRotas = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: queryError } = await supabase
        .from('rotas_disponiveis')
        .select(`
          cod_rota,
          num_linha,
          origem,
          destino,
          horario_partida,
          horario_chegada,
          onibus:onibus(num_rota, placa, capacidade_passageiros)
        `)
        .order('horario_partida', { ascending: true });

      console.log('Dados recebidos:', data);

      if (queryError) {
        throw queryError;
      }

      if (data && data.length > 0) {
        const rotasFormatadas = data.map((rota) => {
          const partida = rota.horario_partida ? new Date(rota.horario_partida) : null;
          const chegada = rota.horario_chegada ? new Date(rota.horario_chegada) : null;

          return {
            id: rota.cod_rota,
            numero: rota.onibus?.placa || rota.num_linha?.slice(0, 4) || '0000',
            rota: `${rota.origem || 'Origem'} → ${rota.destino || 'Destino'}`,
            vagas: rota.onibus?.capacidade_passageiros?.toString() || 'Indisponível',
            horarios: `${partida ? partida.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'} - ${chegada ? chegada.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}`,
            status: 'disponível'
          };
        });

        setRotas(rotasFormatadas);
      } else {
        setError('Nenhuma rota cadastrada no sistema');
      }
    } catch (err) {
      console.error('Erro ao buscar rotas:', err);
      setError(`Erro ao carregar dados: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRotas();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Carregando rotas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchRotas} 
        >
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (rotas.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhuma rota disponível no momento</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchRotas}
        >
          <Text style={styles.retryButtonText}>Recarregar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={rotas}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.rowContainer}>
            <View style={styles.description}>
              <Image source={fotoOnibus} style={styles.imagem} />
              <View style={styles.infoText}>
                <Text style={styles.text}>Ônibus: {item.numero}</Text>
                <Text style={styles.text}>Rota: {item.rota}</Text>
                <Text style={styles.text}>Vagas: {item.vagas}</Text>
                <Text style={styles.text}>Horário: {item.horarios}</Text>
              </View>
            </View>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Carrinho')}
              style={styles.carrinhoButton}
            >
              <Image source={fotoCarrinho} style={styles.carrinho} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

// Os estilos permanecem os mesmos do código anterior
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  listContent: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  imagem: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 4,
  },
  description: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carrinho: {
    width: 40,
    height: 40,
  },
  carrinhoButton: {
    padding: 8,
  },
  text: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  infoText: {
    flex: 1,
  },
});