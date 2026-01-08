import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import { styles } from '../Styles/styles';

const bgImage = require('../assets/imagem de fundo.png');

export default function WelcomeScreen({ onNavigate }) {
  return (
    <View style={styles.welcomeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ImageBackground
        source={bgImage}
        style={styles.welcomeHeaderBackground}
        resizeMode="cover"
      />

      <View style={styles.welcomeContent}>
        <Text style={styles.welcomeTitle}>Olá</Text>
        <Text style={styles.welcomeSubtitle}>
          Bem-vindo ao{''}
          <Text style={styles.welcomeSubtitleBold}> psify!</Text>
        </Text>

        <TouchableOpacity style={styles.welcomeButton} onPress={() => onNavigate('login')}>
          <Text style={styles.welcomeButtonText}>Vamos começar!</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.welcomeIndicators}>
        <View style={[styles.welcomeIndicator, styles.welcomeIndicatorActive]} />
        <View style={styles.welcomeIndicator} />
        <View style={styles.welcomeIndicator} />
      </View>
    </View>
  );
}
