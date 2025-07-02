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

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        if (
            !formData.nome ||
            !formData.identidade ||
            !formData.quantPessoas ||
            !formData.quantBagagem ||
            !formData.valorPassagem ||
            !formData.formaPagamento
        ) {
            Alert.alert('Atenção', 'Preencha todos os campos');
            return;
        }

        setLoading(true);

        try {
            // Verificar sessão do usuário
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            
            if (sessionError || !session?.user) {
                throw new Error(sessionError?.message || 'Usuário não autenticado');
            }

            // Verificar se o usuário existe na tabela usuarios
            const { data: userData, error: userError } = await supabase
                .from('usuarios')
                .select('cod_usuario')
                .eq('cod_usuario', session.user.id)
                .single();

            if (userError || !userData) {
                throw new Error('Usuário não encontrado na base de dados');
            }

            // Preparar dados para inserção
            const insertData = {
            num_passageiros: session.user.id,
            valor_passagem: formData.valorPassagem ? Number(formData.valorPassagem) : null,
            forma_pagamentos: formData.formaPagamento || null,
            quant_pessoas: formData.quantPessoas ? Number(formData.quantPessoas) : null,
            quant_bagagem: formData.quantBagagem ? Number(formData.quantBagagem) : null,
            status_pagamento: 'pendente',
            data_pagamento: new Date().toISOString(),
            num_viagem: null // Explicitamente definido como null
};

            // Inserir os dados
            const { data, error } = await supabase
                .from('pagamentos_passagens')
                .insert([insertData])
                .select()
                .single();

            if (error) {
                console.error('Detalhes do erro:', error);
                throw new Error(error.details || error.message || 'Erro ao inserir dados');
            }

            Alert.alert('Sucesso', `Reserva #${data.cod_pagamentos} criada!`);
            navigation.goBack();
        } catch (err) {
            console.error('Erro completo:', err);
            Alert.alert('Erro', err.message || 'Erro no servidor');
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
                    {loading && <ActivityIndicator size="large" color="#0d4412" />}

                    <Text style={styles.title}>NOME</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu nome"
                        placeholderTextColor="#888"
                        value={formData.nome}
                        onChangeText={(text) => handleChange('nome', text)}
                    />

                    <Text style={styles.title}>IDENTIDADE</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua identidade"
                        placeholderTextColor="#888"
                        value={formData.identidade}
                        onChangeText={(text) => handleChange('identidade', text)}
                    />

                    <Text style={styles.title}>QUANTIDADE DE PESSOAS</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: 1"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        value={formData.quantPessoas}
                        onChangeText={(text) => handleChange('quantPessoas', text)}
                    />

                    <Text style={styles.title}>QUANTIDADE DE BAGAGEM</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: 1"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        value={formData.quantBagagem}
                        onChangeText={(text) => handleChange('quantBagagem', text)}
                    />

                    <Text style={styles.title}>PONTO DE ÔNIBUS PRÓXIMO</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Informe o ponto mais próximo"
                        placeholderTextColor="#888"
                        value={formData.pontoOnibus}
                        onChangeText={(text) => handleChange('pontoOnibus', text)}
                    />

                    <Text style={styles.title}>VALOR DA PASSAGEM</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Informe o valor"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        value={formData.valorPassagem}
                        onChangeText={(text) => handleChange('valorPassagem', text)}
                    />

                    <View style={styles.formasPagamentoContainer}>
                        <Text style={styles.formasPagamentoText}>FORMAS DE PAGAMENTO</Text>
                        <View style={styles.iconesContainer}>
                            <TouchableOpacity onPress={() => handleChange('formaPagamento', 'PIX')}>
                                <Text style={styles.icone}>💠</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleChange('formaPagamento', 'Dinheiro')}>
                                <Text style={styles.icone}>📱</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleChange('formaPagamento', 'Cartão')}>
                                <Text style={styles.icone}>💳</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleChange('formaPagamento', 'Transferência')}>
                                <Text style={styles.icone}>💸</Text>
                            </TouchableOpacity>
                        </View>
                        {formData.formaPagamento ? (
                            <Text style={styles.formaSelecionada}>
                                Selecionado: {formData.formaPagamento}
                            </Text>
                        ) : null}
                    </View>

                    <TouchableOpacity 
                        style={styles.botao} 
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <Text style={styles.botaoTexto}>
                            {loading ? 'PROCESSANDO...' : 'CONFIRMAR'}
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
        backgroundColor: '#D9D9D9',
        paddingBottom: 5,
    },
    container: {
        padding: 16,
        height: 500, 
        paddingBottom: 30,
    },
    title: {
        color: '#000',
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 4,
        fontSize: 18,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 6,
        padding: 10,
        color: '#000',
        marginBottom: 8,
    },
    formasPagamentoContainer: {
        marginTop: 24,
        alignItems: 'center',
    },
    formasPagamentoText: {
        color: '#000',
        fontSize: 18,
        marginBottom: 8,
    },
    iconesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
    },
    icone: {
        fontSize: 24,
        color: '#000',
    },
    formaSelecionada: {
        marginTop: 8,
        color: '#0d4412',
        fontWeight: 'bold',
    },
    botao: {
        marginTop: 24,
        backgroundColor: '#0d4412',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 60,
        opacity: 1,
    },
    botaoTexto: {
        color: '#fff',
    },
});