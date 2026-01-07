import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { styles } from '../Styles/styles';
import CustomInput from '../components/Input';

export default function LoginScreen({ onNavigate }) {
	return (
		<View style={styles.loginContainer}>
			<StatusBar barStyle="dark-content" backgroundColor="#98c5de" />
      
			{/* Decoração de Fundo (Ondas sutis) */}
			<View style={styles.loginBackgroundCircleTop} />
			<View style={styles.loginBackgroundCircleBottom} />

			<ScrollView contentContainerStyle={styles.loginScrollContent}>
        
				{/* Card Branco Central */}
				<View style={styles.loginCard}>
					<Text style={styles.loginTitle}>Login</Text>

					<View style={styles.formArea}>
						<CustomInput label="Email" placeholder="" />
						<CustomInput label="Senha" secureTextEntry={true} showIcon={true} />
					</View>

					<View style={{ alignItems: 'center', marginTop: 10 }}>
						<TouchableOpacity style={styles.primaryButton}>
							<Text style={styles.primaryButtonText}>Login</Text>
						</TouchableOpacity>

						<View style={styles.linkContainer}>
							<Text style={styles.orText}>ou</Text>
							<TouchableOpacity onPress={() => onNavigate('cadastro')}>
											<Text style={[styles.linkText, styles.linkBold]}>
												Cadastre-se
											</Text>
										</TouchableOpacity>
						</View>
					</View>
				</View>

				{/* Botão Voltar (Fora do Card) */}
				<TouchableOpacity style={styles.backButton} onPress={() => onNavigate('cadastro')}>
					<Text style={styles.backButtonText}>Voltar</Text>
				</TouchableOpacity>

			</ScrollView>
		</View>
	);
}
