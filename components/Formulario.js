import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../lib/supabase';

export default function Formulario({ navigation }) {
    const [formData, setFormData] = useState({
        nome: '',
        identidade: '',
        quantPessoas: '',
        quantBagagem: '',
        pontoOnibus: '',
        valorPassagem: '',
        formaPagamento: ''
    });

    const [loading, setLoading] = useState(false);

    // Função para verificar ou criar usuário na tabela 'usuarios'
    const verifyOrCreateUser = async (authUser) => {
        try {
            // 1. Tentar encontrar o usuário
            const { data: existingUser, error: fetchError } = await supabase
                .from('usuarios')
                .select('cod_usuario')
                .eq('cod_usuario', authUser.id)
                .single();

            if (!fetchError && existingUser) return existingUser;

            // 2. Se não existir, criar novo registro
            const { data: newUser, error: createError } = await supabase
                .from('usuarios')
                .insert([{
                    cod_usuario: authUser.id,
                    nome_usuario: formData.nome || authUser.email?.split('@')[0] || 'Usuário',
                    identidade: formData.identidade || '',
                    email: authUser.email,
                    tipo_usuario: 'passageiro'
                }])
                .select()
                .single();

            if (createError) throw createError;
            return newUser;

        } catch (error) {
            console.error('Erro em verifyOrCreateUser:', error);
            throw new Error('Falha ao verificar/criar usuário');
        }
    };

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        // Validação dos campos obrigatórios
        if (!formData.nome || !formData.identidade || !formData.quantPessoas || 
            !formData.quantBagagem || !formData.valorPassagem || !formData.formaPagamento) {
            Alert.alert('Atenção', 'Preencha todos os campos obrigatórios');
            return;
        }

        setLoading(true);

        try {
            // Verificar sessão do usuário
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (sessionError || !session?.user) {
                throw new Error(sessionError?.message || 'Usuário não autenticado');
            }

            // Verificar ou criar usuário na tabela
            await verifyOrCreateUser(session.user);

            // Preparar dados para inserção
            const insertData = {
                num_passageiros: session.user.id,
                valor_passagem: Number(formData.valorPassagem),
                forma_pagamentos: formData.formaPagamento,
                quant_pessoas: Number(formData.quantPessoas),
                quant_bagagem: Number(formData.quantBagagem),
                status_pagamento: 'pendente',
                data_pagamento: new Date().toISOString(),
                num_viagem: null
            };

            // Inserir os dados
            const { data, error } = await supabase
                .from('pagamentos_passagens')
                .insert([insertData])
                .select()
                .single();

            if (error) throw error;

            Alert.alert('Sucesso', `Reserva #${data.cod_pagamentos} criada com sucesso!`);
            navigation.goBack();

        } catch (err) {
            console.error('Erro no formulário:', err);
            Alert.alert('Erro', err.message || 'Ocorreu um erro ao processar sua reserva');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.painel}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    {loading && <ActivityIndicator size="large" color="#0d4412" style={styles.loader} />}

                    <Text style={styles.title}>NOME COMPLETO</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu nome completo"
                        placeholderTextColor="#888"
                        value={formData.nome}
                        onChangeText={(text) => handleChange('nome', text)}
                    />

                    <Text style={styles.title}>DOCUMENTO (RG/CPF)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu número de documento"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        value={formData.identidade}
                        onChangeText={(text) => handleChange('identidade', text)}
                    />

                    <Text style={styles.title}>QUANTIDADE DE PESSOAS</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Número de passageiros"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        value={formData.quantPessoas}
                        onChangeText={(text) => handleChange('quantPessoas', text)}
                    />

                    <Text style={styles.title}>QUANTIDADE DE BAGAGEM</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Número de volumes"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        value={formData.quantBagagem}
                        onChangeText={(text) => handleChange('quantBagagem', text)}
                    />

                    <Text style={styles.title}>PONTO DE ÔNIBUS PRÓXIMO</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Informe o ponto de embarque"
                        placeholderTextColor="#888"
                        value={formData.pontoOnibus}
                        onChangeText={(text) => handleChange('pontoOnibus', text)}
                    />

                    <Text style={styles.title}>VALOR DA PASSAGEM (R$)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Valor total"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        value={formData.valorPassagem}
                        onChangeText={(text) => handleChange('valorPassagem', text)}
                    />

                    <View style={styles.formasPagamentoContainer}>
                        <Text style={styles.formasPagamentoText}>FORMA DE PAGAMENTO</Text>
                        <View style={styles.iconesContainer}>
                            <TouchableOpacity 
                                style={styles.iconeButton}
                                onPress={() => handleChange('formaPagamento', 'PIX')}
                            >
                                <Text style={styles.icone}>💠 PIX</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.iconeButton}
                                onPress={() => handleChange('formaPagamento', 'Dinheiro')}
                            >
                                <Text style={styles.icone}>💵 Dinheiro</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.iconeButton}
                                onPress={() => handleChange('formaPagamento', 'Transferência')}
                            >
                                <Text style={styles.icone}>📱 Transferir</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.iconeButton}
                                onPress={() => handleChange('formaPagamento', 'Cartão')}
                            >
                                <Text style={styles.icone}>💳 Cartão</Text>
                            </TouchableOpacity>
                        </View>
                        {formData.formaPagamento && (
                            <Text style={styles.formaSelecionada}>
                                Forma selecionada: {formData.formaPagamento}
                            </Text>
                        )}
                    </View>

                    <TouchableOpacity 
                        style={[styles.botao, loading && styles.botaoDisabled]} 
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <Text style={styles.botaoTexto}>
                            {loading ? 'PROCESSANDO...' : 'CONFIRMAR RESERVA'}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    painel: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        padding: 20,
        paddingBottom: 40,
    },
    loader: {
        marginVertical: 20,
    },
    title: {
        color: '#0d4412',
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
        fontSize: 16,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        color: '#333',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    formasPagamentoContainer: {
        marginTop: 20,
        marginBottom: 15,
    },
    formasPagamentoText: {
        color: '#0d4412',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    iconesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    iconeButton: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    icone: {
        fontSize: 16,
        color: '#0d4412',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        width: '100%',
        textAlign: 'center',
    },
    formaSelecionada: {
        marginTop: 10,
        color: '#0d4412',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    botao: {
        marginTop: 25,
        backgroundColor: '#0d4412',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    botaoDisabled: {
        opacity: 0.6,
    },
    botaoTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});