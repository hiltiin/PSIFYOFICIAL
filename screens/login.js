import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import { styles } from '../Styles/styles';
import CustomInput from '../components/Input';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({ onNavigate }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		if (!email || !password) {
			Alert.alert('Erro', 'Preencha email e senha');
			return;
		}
		try {
			await signInWithEmailAndPassword(auth, email, password);
			onNavigate('home');
		} catch (error) {
			Alert.alert('Erro', error.message);
		}
	};

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
						<CustomInput label="Email" placeholder="" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
						<CustomInput label="Senha" secureTextEntry showIcon value={password} onChangeText={setPassword} />
					</View>

					<View style={{ alignItems: 'center', marginTop: 10 }}>
						<TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
							<Text style={styles.primaryButtonText}>Login</Text>
						</TouchableOpacity>

						<View style={styles.linkContainer}>
							<Text style={styles.orText}>ou</Text>
							<TouchableOpacity onPress={() => onNavigate('cadastro')}>
								<Text style={[styles.linkText, { fontWeight: 'bold' }]}>Cadastre-se</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}
