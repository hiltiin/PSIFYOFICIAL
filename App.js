import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import CadastroScreen from './screens/cadastro';
import LoginScreen from './screens/login';
import WelcomeScreen from './screens/welcome';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function App() {
  const [stack, setStack] = useState(['welcome']);
  const current = stack[stack.length - 1];

  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  function navigate(to) {
    if (to && typeof to === 'object') {
      if (to.type === 'reset' && typeof to.to === 'string') {
        setStack([to.to]);
      }
      return;
    }

    if (to === 'back') {
      if (stack.length > 1) setStack(prev => prev.slice(0, -1));
      return;
    }
    setStack(prev => [...prev, to]);
  }

  if (current === 'welcome') return <WelcomeScreen onNavigate={navigate} />;
  if (current === 'login') return <LoginScreen onNavigate={navigate} />;
  return <CadastroScreen onNavigate={navigate} />;
}