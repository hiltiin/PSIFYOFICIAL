import React from 'react';
import { View, Text, TouchableOpacity, Image, Switch, StyleSheet } from 'react-native';

export default function PerfilScreen({ onNavigate }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate && onNavigate('back')} style={styles.backButton}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Image source={require('../assets/icone de perfil.png')} style={styles.profileIcon} />
        <Text style={styles.title}>Minha conta</Text>
      </View>
      {/* Menu */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}><Text style={styles.menuText}>Editar perfil</Text></TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}><Text style={styles.menuText}>Segurança</Text></TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}><Text style={styles.menuText}>Ajuda e suporte</Text></TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}><Text style={styles.menuText}>Termos e política</Text></TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}><Text style={styles.menuText}>Excluir conta</Text></TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}><Text style={styles.menuText}>Sair</Text></TouchableOpacity>
      </View>
      {/* Alto Contraste Switch (não funcional) */}
      <View style={styles.contrastContainer}>
        <Text style={styles.contrastLabel}>Alto Contraste</Text>
        <Switch value={false} disabled={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#B3D6F6',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
    zIndex: 2,
  },
  backArrow: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  menu: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E3F0FB',
    paddingVertical: 18,
  },
  menuText: {
    fontSize: 17,
    color: '#7DB5E4',
  },
  contrastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  contrastLabel: {
    fontSize: 16,
    color: '#7DB5E4',
    marginRight: 10,
    backgroundColor: '#E3F0FB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
});
