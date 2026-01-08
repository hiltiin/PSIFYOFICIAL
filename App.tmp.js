import React, { useState, useRef } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import CadastroScreen from './screens/cadastro';
import LoginScreen from './screens/login';
import WelcomeScreen from './screens/welcome';
import Onboarding2 from './screens/onboarding2';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { Provider as PaperProvider, DefaultTheme, configureFonts } from 'react-native-paper';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('welcome');
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_500Medium, Poppins_700Bold });
  const defaultSetRef = useRef(false);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!defaultSetRef.current) {
    if (Text.defaultProps == null) Text.defaultProps = {};
    const existingStyle = Text.defaultProps.style || {};
    Text.defaultProps.style = Array.isArray(existingStyle)
      ? [{ fontFamily: 'Poppins_400Regular' }, ...existingStyle]
      : [{ fontFamily: 'Poppins_400Regular' }, existingStyle];
    defaultSetRef.current = true;
  }

  const fontConfig = {
    default: {
      regular: {
        fontFamily: 'Poppins_400Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Poppins_500Medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Poppins_400Regular',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Poppins_400Regular',
        fontWeight: 'normal',
      },
    },
  };

  const theme = {
    ...DefaultTheme,
    fonts: configureFonts(fontConfig),
  };

  if (telaAtual === 'login')
    return (
      <PaperProvider theme={theme}>
        <LoginScreen onNavigate={setTelaAtual} />
      </PaperProvider>
    );
  if (telaAtual === 'cadastro')
    return (
      <PaperProvider theme={theme}>
        <CadastroScreen onNavigate={setTelaAtual} />
      </PaperProvider>
    );
  if (telaAtual === 'onboarding2')
    return (
      <PaperProvider theme={theme}>
        <Onboarding2 onNavigate={setTelaAtual} />
      </PaperProvider>
    );
  return (
    <PaperProvider theme={theme}>
      <WelcomeScreen onNavigate={setTelaAtual} />
    </PaperProvider>
  );
}
