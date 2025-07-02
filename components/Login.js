import React, { useState } from 'react';
import { View, TextInput, Alert, Image, ScrollView, Text, Button, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSingIn() {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      Alert.alert('Error', error.message);
      setLoading(false);
      return;
    }
    
    Alert.alert('Sucesso ao cadastrar!');
    setLoading(false);
    navigation.replace('Home');
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.panel}>
          <Image
            source={require('../assets/logo.jpeg')}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Formulário */}
          <View style={styles.formContainer}>
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
                title={loading ? "Carregando..." : "Entrar"}
                onPress={handleSingIn}
                color="#053908"
              />
            </View>

            <View style={styles.linksContainer}>
              <Text style={styles.linkText} onPress={() => navigation.navigate('Cadastro')}>Cadastre-se</Text>
              <Text style={styles.linkText}>Esqueceu a senha?</Text>
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
