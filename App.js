import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import CadastroScreen from './screens/cadastro';
import LoginScreen from './screens/login';
// carregar Poppins
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

// App apenas gerencia qual tela exibir (cadastro ou login) e carrega as fontes
export default function App() {
  const [telaAtual, setTelaAtual] = useState('cadastro'); // 'cadastro' ou 'login'

  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (telaAtual === 'login') return <LoginScreen onNavigate={setTelaAtual} />;
  return <CadastroScreen onNavigate={setTelaAtual} />;
}