import React, { useState } from 'react';
import CadastroScreen from './screens/cadastro';
import LoginScreen from './screens/login';

// App agora apenas gerencia qual tela exibir (cadastro ou login)
export default function App() {
  const [telaAtual, setTelaAtual] = useState('cadastro'); // 'cadastro' ou 'login'

  if (telaAtual === 'login') return <LoginScreen onNavigate={setTelaAtual} />;
  return <CadastroScreen onNavigate={setTelaAtual} />;
}