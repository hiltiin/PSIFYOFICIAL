import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image, ImageBackground } from 'react-native';
import { styles } from '../Styles/styles';
import { Ionicons } from '@expo/vector-icons';

const bgImage = require('../assets/imagem de fundo.png');
const heroImage = require('../assets/image.png');

export default function Onboarding2Screen({ onNavigate }) {
  return (
    <View style={styles.onboardingContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <TouchableOpacity
        style={[styles.backTopLeft, styles.onboardingBackTopLeft]}
        onPress={() => onNavigate({ type: 'reset', to: 'welcome' })}
      >
        <Ionicons name="chevron-back" size={30} color="#5d9cbf" />
      </TouchableOpacity>

      <ImageBackground
        source={bgImage}
        style={styles.onboardingHeaderBackground}
        resizeMode="cover"
      />

      <View style={styles.onboardingContent}>
        <Image source={heroImage} style={styles.onboardingHero} resizeMode="contain" />

        <Text style={styles.onboardingTitle}>Encontre{`\n`}psicólogos</Text>
        <Text style={styles.onboardingSubtitle}>
          Próximos a sua região,{`\n`}com os mais variados{`\n`}serviços
        </Text>

        <TouchableOpacity style={styles.onboardingButton} onPress={() => onNavigate('onboarding3')}>
          <Text style={styles.onboardingButtonText}>Próximo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.welcomeIndicators}>
        <View style={styles.welcomeIndicator} />
        <View style={[styles.welcomeIndicator, styles.welcomeIndicatorActive]} />
        <View style={styles.welcomeIndicator} />
      </View>
    </View>
  );
}
