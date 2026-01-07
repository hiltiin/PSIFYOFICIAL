import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, ImageBackground } from 'react-native';
import { styles } from '../Styles/styles'; // Importa estilos
import CustomInput from '../components/Input'; // Importa input
const bgImage = require('../assets/imagem de fundo.png');

export default function CadastroScreen({ onNavigate }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Fundo Onda (imagem) */}
      <ImageBackground source={bgImage} style={styles.headerBackground} resizeMode="cover">
        {/* imagem usada como fundo com efeito de onda */}
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Cadastro</Text>

        <View style={styles.formArea}>
          <CustomInput label="Email" placeholder="" />
          <CustomInput label="Senha" secureTextEntry={true} showIcon={true} />
          <CustomInput label="Confirmar Senha" secureTextEntry={true} showIcon={true} />
        </View>

        <TouchableOpacity style={styles.primaryButton}>
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
      </ScrollView>
    </View>
  );
}