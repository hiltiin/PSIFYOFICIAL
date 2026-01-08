import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import { styles } from '../Styles/styles';
import { Ionicons } from '@expo/vector-icons';

const heroImage2 = require('../assets/image2.png');

export default function Onboarding3Screen({ onNavigate }) {
  return (
    <View style={styles.onboarding3Container}>
      <StatusBar barStyle="dark-content" backgroundColor="#98c5de" />

      <TouchableOpacity
        style={[styles.backTopLeft, styles.onboardingBackTopLeft]}
        onPress={() => onNavigate('back')}
      >
        <Ionicons name="chevron-back" size={30} color="#5d9cbf" />
      </TouchableOpacity>

      <View style={styles.onboarding3Card}>
        <View style={styles.onboarding3IllustrationCard}>
          <Image source={heroImage2} style={styles.onboarding3Hero} resizeMode="contain" />
        </View>

        <View style={styles.onboarding3Content}>
          <Text style={styles.onboarding3Title}>Agendamento{`\n`}facilitado</Text>
          <Text style={styles.onboarding3Subtitle}>
            Agendar suas sessões de{`\n`}terapia e nunca foi tão{`\n`}fácil
          </Text>

          <TouchableOpacity
            style={styles.onboarding3PrimaryButton}
            onPress={() => onNavigate({ type: 'reset', to: 'cadastro' })}
          >
            <Text style={styles.onboarding3PrimaryButtonText}>Criar conta</Text>
          </TouchableOpacity>

          <Text style={styles.onboarding3OrText}>ou</Text>

          <TouchableOpacity onPress={() => onNavigate({ type: 'reset', to: 'login' })}>
            <Text style={styles.onboarding3LoginLink}>Faça Login</Text>
          </TouchableOpacity>

          <View style={styles.onboarding3IndicatorsWrap}>
            <View style={styles.welcomeIndicators}>
              <View style={[styles.welcomeIndicator, styles.onboarding3Indicator]} />
              <View style={[styles.welcomeIndicator, styles.onboarding3Indicator]} />
              <View style={[styles.welcomeIndicator, styles.onboarding3Indicator, styles.welcomeIndicatorActive]} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
