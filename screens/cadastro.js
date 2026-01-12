import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, ImageBackground, Alert } from 'react-native';
import { styles } from '../Styles/styles';
import CustomInput from '../components/Input';
import { Ionicons } from '@expo/vector-icons';
const bgImage = require('../assets/imagem de fundo.png');
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

export default function CadastroScreen({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !name || !lastName) {
      Alert.alert('Erro', 'Preencha nome, sobrenome, email e senha');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'Senhas não coincidem');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      try {
        await set(ref(db, `users/${user.uid}`), { email, firstName: name, lastName, createdAt: Date.now() });
      } catch (dbErr) {
        console.warn('Erro ao salvar no Realtime DB:', dbErr);
      }
      Alert.alert('Sucesso', 'Usuário registrado');
      onNavigate('login');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <TouchableOpacity
        style={styles.backTopLeft}
        onPress={() => onNavigate({ type: 'reset', to: 'welcome' })}
      >
        <Ionicons name="chevron-back" size={30} color="#5d9cbf" />
      </TouchableOpacity>
      
      <ImageBackground source={bgImage} style={styles.headerBackground} resizeMode="cover">
      </ImageBackground>

      <View style={styles.scrollContent}>
        <Text style={styles.title}>Cadastro</Text>

        <View style={styles.formArea}>
          <CustomInput label="Nome" placeholder="Nome" value={name} onChangeText={setName} autoCapitalize="words" />
          <CustomInput label="Sobrenome" placeholder="Sobrenome" value={lastName} onChangeText={setLastName} autoCapitalize="words" />
          <CustomInput label="Email" placeholder="" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          <CustomInput label="Senha" secureTextEntry={true} showIcon={true} value={password} onChangeText={setPassword} />
          <CustomInput label="Confirmar Senha" secureTextEntry={true} showIcon={true} value={confirmPassword} onChangeText={setConfirmPassword} />
        </View>

        <TouchableOpacity style={[styles.primaryButton, styles.fullPrimaryButton]} onPress={handleRegister}>
          <Text style={styles.primaryButtonText}>Cadastrar</Text>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <Text style={styles.orText}>ou</Text>
          <TouchableOpacity onPress={() => onNavigate('login')}>
            <Text style={styles.linkText}>
              Faça <Text style={styles.linkBold}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Sou psicólogo(a)!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}