import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { styles } from '../Styles/styles';
import CustomInput from '../components/Input';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ onNavigate }) {
	return (
		<View style={styles.loginContainer}>
			{/* Back arrow to previous screen */}
			<TouchableOpacity style={styles.backTopLeft} onPress={() => onNavigate({ type: 'reset', to: 'welcome' })}>
				<Ionicons name="chevron-back" size={30} color="#5d9cbf" />
			</TouchableOpacity>
			<StatusBar barStyle="dark-content" backgroundColor="#98c5de" />

			<View style={styles.loginBackgroundCircleTop} />
			<View style={styles.loginBackgroundCircleBottom} />

			<ScrollView contentContainerStyle={styles.loginScrollContent}>
				<View style={styles.loginCard}>
					<Text style={styles.loginTitle}>Login</Text>

					<View style={styles.formArea}>
						<CustomInput label="Email" placeholder="" />
						<CustomInput label="Senha" secureTextEntry onClear={() => {}} />
					</View>

					<View style={{ alignItems: 'center', marginTop: 10 }}>
						<TouchableOpacity style={styles.primaryButton} onPress={() => onNavigate('home')}>
							<Text style={styles.primaryButtonText}>Login</Text>
						</TouchableOpacity>

						<View style={styles.linkContainer}>
							<Text style={styles.orText}>ou</Text>
							<TouchableOpacity onPress={() => onNavigate('cadastro')}>
								<Text style={[styles.linkText, {fontWeight: 'bold'}]}>
									Cadastre-se
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>

        
			</ScrollView>
		</View>
	);
}
