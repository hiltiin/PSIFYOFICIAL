import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SolicitacaoScreen({ onNavigate }) {
  return (
    <View style={s.container}>
      <View style={s.topRow}>
        <TouchableOpacity onPress={() => onNavigate && onNavigate('back')} style={s.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#5d9cbf" />
        </TouchableOpacity>
        <Image source={require('../assets/psifylogo.png')} style={s.logo} />
      </View>

      <Text style={s.title}>Parabéns!</Text>

      <View style={s.line} />

      <Text style={s.text}>
        Você realizou uma solicitação de{"\n"}
        consulta, o psicólogo poderá lhe{"\n"}
        responder em até dois dias antes da sua{"\n"}
        consulta.
      </Text>

      <TouchableOpacity style={s.okButton} onPress={() => onNavigate && onNavigate('home')}>
        <Text style={s.okText}>Ok!</Text>
      </TouchableOpacity>

      <Image source={require('../assets/image2.png')} style={s.wave} />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 56,
    paddingHorizontal: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
  },
  title: {
    color: '#5d9cbf',
    fontSize: 34,
    fontFamily: 'Poppins_700Bold',
    marginTop: 40,
  },
  line: {
    height: 1,
    backgroundColor: '#E3EAF2',
    marginTop: 14,
    marginBottom: 18,
    width: 220,
  },
  text: {
    color: '#7BA6C7',
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 18,
    marginTop: 2,
  },
  okButton: {
    marginTop: 28,
    alignSelf: 'center',
    backgroundColor: '#7BA6C7',
    paddingHorizontal: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  okText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
  },
  wave: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: 260,
    resizeMode: 'cover',
  },
});
