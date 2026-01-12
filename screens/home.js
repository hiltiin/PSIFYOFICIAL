import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../Styles/styles';
import { auth, db } from '../firebase';
import { ref, get } from 'firebase/database';

export default function HomeScreen({ onNavigate }) {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const fetchName = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const snap = await get(ref(db, `users/${user.uid}`));
        if (snap.exists()) {
          const data = snap.val();
          setFirstName(data.firstName || '');
        }
      } catch (err) {
        console.warn('Erro ao buscar nome:', err);
      }
    };
    fetchName();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar profissionais"
            placeholderTextColor="#B3C2CC"
          />
          <Image source={require('../assets/lupa.png')} style={styles.searchIcon} />
        </View>
        <TouchableOpacity onPress={() => onNavigate && onNavigate('perfil')}>
          <Image source={require('../assets/icone de perfil.png')} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.cepText}>Inserir CEP</Text>
      </TouchableOpacity>

      <Text style={styles.helloText}>Olá, {firstName ? firstName : 'Usuário'}!</Text>
      <Text style={styles.subtitle}>Sua jornada de autocuidado começa aqui.</Text>
      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Psicólogos próximos a sua região</Text>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        {[1,2,3,4,5,6,7,8,9,10].map((item) => (
          <View key={item} style={styles.card}>
            <Image source={require('../assets/perfil do psicologo.png')} style={styles.psychologistIcon} />
            <View style={styles.cardTextContainer}>
              <View style={styles.cardTextLine} />
              <View style={styles.cardTextLine} />
            </View>
            <View style={styles.cardIcons}>
              <TouchableOpacity>
                <Image source={require('../assets/favoritos.png')} style={styles.cardIcon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../assets/chat.png')} style={styles.cardIcon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomFill} />
      <View style={styles.bottomBar}>
        <TouchableOpacity>
          <Image source={require('../assets/home.png')} style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onNavigate && onNavigate('agenda')}>
          <Image source={require('../assets/agenda.png')} style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onNavigate && onNavigate('diario')}>
          <Image source={require('../assets/diario.png')} style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/chat.png')} style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/favoritos.png')} style={styles.bottomIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


