import React, { useState } from 'react';
import { View, TextInput, Alert, Image, ScrollView, Button, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

export default function Login({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSingUp() {
    setLoading(true);
    console.log("Testando: ", email, password);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    });

    console.log("Resposta do supa: ", {data, error});

    if (error) {
      Alert.alert('Error', error.message);
      setLoading(false);
      return;
    }
    
    setLoading(false);
    navigation.replace('Login');
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Ionicons 
            name="arrow-back" 
            size={24} 
            color="black" 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
        />
        <View style={styles.panel}>
          <Image
            source={require('../assets/logo.jpeg')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Ionicons name="person" size={20} color="#053908" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Nome Completo"
                placeholderTextColor="#666"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#053908" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#666"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#053908" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#666"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title={loading ? "Carregando..." : "Cadastrar"}
                onPress={handleSingUp}
                color="#053908"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d4412',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20, 
  },
  panel: {
    backgroundColor: 'white',
    padding: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 400,
    height: 400,
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#053908',
    marginBottom: 20,
    paddingBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#053908',
    fontSize: 16,
    paddingVertical: 8,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  linkText: {
    color: '#053908',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});
