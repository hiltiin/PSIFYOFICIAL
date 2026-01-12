import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/styles';
import { auth, db } from '../firebase';
import { ref, set } from 'firebase/database';

export default function ProfissionaisScreen({ onNavigate }) {
  const professionals = [
    { name: 'chiquim', email: 'chiquim@gmail.com' },
    { name: 'mariana', email: 'mariana@gmail.com' },
    { name: 'joao', email: 'joao@gmail.com' },
    { name: 'camila', email: 'camila@gmail.com' },
    { name: 'renata', email: 'renata@gmail.com' },
    { name: 'bruno', email: 'bruno@gmail.com' },
  ];

  const saveSelectedProfessional = async (professional) => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      await set(ref(db, `users/${user.uid}/selectedProfessional`), {
        name: professional?.name || '',
        email: professional?.email || '',
      });
    } catch (err) {
      console.warn('Erro ao salvar profissional:', err);
    }
  };

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
      </View>

      <TouchableOpacity style={{ marginLeft: 16, marginTop: 4, marginBottom: 8 }} onPress={() => onNavigate && onNavigate('back')}>
        <Ionicons name="chevron-back" size={28} color="#5d9cbf" />
      </TouchableOpacity>

      <Text style={[styles.helloText, { fontSize: 28, marginTop: 0 }]}>
        Selecione o{"\n"}
        profissional para{"\n"}
        sua consulta.
      </Text>

      <Text style={styles.sectionTitle}>Psicólogos próximos a sua região</Text>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {professionals.map((p) => (
          <TouchableOpacity
            key={p.email}
            style={styles.card}
            onPress={async () => {
              await saveSelectedProfessional(p);
              onNavigate && onNavigate('horario');
            }}
          >
            <Image source={require('../assets/perfil do psicologo.png')} style={styles.psychologistIcon} />
            <View style={styles.cardTextContainer}>
              <Text style={localStyles.cardName}>{p.name}</Text>
              <Text style={localStyles.cardEmail}>{p.email}</Text>
            </View>
            <View style={styles.cardIcons}>
              <TouchableOpacity>
                <Image source={require('../assets/favoritos.png')} style={styles.cardIcon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../assets/chat.png')} style={styles.cardIcon} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomFill} />
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => onNavigate && onNavigate('home')}>
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

const localStyles = StyleSheet.create({
  cardName: {
    color: '#3A6B8E',
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 2,
  },
  cardEmail: {
    color: '#7BA6C7',
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
  },
});
