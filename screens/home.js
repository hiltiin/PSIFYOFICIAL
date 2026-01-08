import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../Styles/styles';

export default function HomeScreen({ onNavigate }) {
  return (
    <View style={styles.container}>
      {/* Barra de busca */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar profissionais"
            placeholderTextColor="#B3C2CC"
          />
          <Image source={require('../assets/lupa.png')} style={styles.searchIcon} />
        </View>
        <TouchableOpacity>
          <Image source={require('../assets/icone de perfil.png')} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      {/* Inserir CEP */}
      <TouchableOpacity>
        <Text style={styles.cepText}>Inserir CEP</Text>
      </TouchableOpacity>

      {/* Saudação */}
      <Text style={styles.helloText}>Olá, Usuário!</Text>
      <Text style={styles.subtitle}>Sua jornada de autocuidado começa aqui.</Text>
      <View style={styles.divider} />

      {/* Psicólogos próximos */}
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

      {/* Barra de navegação inferior */}
      <View style={styles.bottomFill} />
      <View style={styles.bottomBar}>
        <Image source={require('../assets/home.png')} style={styles.bottomIcon} />
        <Image source={require('../assets/agenda.png')} style={styles.bottomIcon} />
        <TouchableOpacity onPress={() => onNavigate && onNavigate('diario')}>
          <Image source={require('../assets/diario.png')} style={styles.bottomIcon} />
        </TouchableOpacity>
        <Image source={require('../assets/chat.png')} style={styles.bottomIcon} />
        <Image source={require('../assets/favoritos.png')} style={styles.bottomIcon} />
      </View>
    </View>
  );
}


