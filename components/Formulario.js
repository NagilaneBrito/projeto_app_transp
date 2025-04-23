import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';

export default function Formulario({ navigation }) {
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
                    <Text style={styles.title}>NOME</Text>
                    {renderCampo('Digite seu nome')}

                    <Text style={styles.title}>IDENTIDADE</Text>
                    {renderCampo('Digite sua identidade')}

                    <Text style={styles.title}>QUANTIDADE DE PESSOAS</Text>
                    {renderCampo('Ex: 1')}

                    <Text style={styles.title}>QUANTIDADE DE BAGAGEM</Text>
                    {renderCampo('Ex: 1')}

                    <Text style={styles.title}>PONTO DE ÔNIBUS PRÓXIMO</Text>
                    {renderCampo('Informe o ponto mais próximo')}

                    <Text style={styles.title}>VALOR DA PASSAGEM</Text>
                    {renderCampo('Informe o valor')}

                    <View style={styles.formasPagamentoContainer}>
                        <Text style={styles.formasPagamentoText}>FORMAS DE PAGAMENTO</Text>
                        <View style={styles.iconesContainer}>
                            <Text style={styles.icone}>💠</Text>
                            <Text style={styles.icone}>📱</Text>
                            <Text style={styles.icone}>💳</Text>
                            <Text style={styles.icone}>💸</Text>
                        </View>
                    </View>

                    {/* Botão de envio */}
                    <TouchableOpacity style={styles.botao}>
                        <Text style={styles.botaoTexto}>CONFIRMA</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

function renderCampo(placeholder) {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#888"
        />
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
    botao: {
        marginTop: 24,
        backgroundColor: '#0d4412',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 60,
    },
    botaoTexto: {
        color: '#fff',
    },
});
