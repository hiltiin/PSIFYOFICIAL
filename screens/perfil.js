import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Switch, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { ref, get } from 'firebase/database';

export default function PerfilScreen({ onNavigate }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const snap = await get(ref(db, `users/${user.uid}`));
        if (snap.exists()) {
          const data = snap.val();
          setFirstName(data.firstName || '');
          setLastName(data.lastName || '');
        }
      } catch (err) {
        console.warn('Erro ao buscar perfil:', err);
      }
    };
    fetchProfile();
  }, []);
  const handleSignOut = async () => {
      try {
      await signOut(auth);
      onNavigate && onNavigate({ type: 'reset', to: 'welcome' });
    } catch (err) {
      Alert.alert('Erro', err.message || 'Erro ao sair');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate && onNavigate('back')} style={styles.backButton}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Image source={require('../assets/icone de perfil.png')} style={styles.profileIcon} />
        <Text style={styles.profileName}>{`${firstName}${firstName && lastName ? ' ' : ''}${lastName}`}</Text>
        <Text style={styles.title}>Minha conta</Text>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}><Text style={styles.menuText}>Editar perfil</Text></TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}><Text style={styles.menuText}>Segurança</Text></TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}><Text style={styles.menuText}>Ajuda e suporte</Text></TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}><Text style={styles.menuText}>Termos e política</Text></TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}><Text style={styles.menuText}>Excluir conta</Text></TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
          <Text style={styles.menuText}>Sair</Text>
        </TouchableOpacity>
      </View>
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
  profileName: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 6,
    fontWeight: '600',
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
