import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { styles as appStyles } from '../Styles/styles';

export default function Diario({ onNavigate }) {
  const entries = [
    { id: '1', date: 'Terça-Feira, 08 de janeiro' },
    { id: '2', date: 'Segunda-Feira, 07 de janeiro' },
    { id: '3', date: 'Domingo, 06 de janeiro' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => onNavigate && onNavigate('home')}>
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>
          <Image source={require('../assets/psifylogo.png')} style={styles.logoPlaceholder} />
        </View>

        <Text style={styles.title}>Seu Diário{"\n"}particular</Text>

        <View style={styles.separator} />

        {entries.map((e) => (
          <View key={e.id} style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardDate}>{e.date}...</Text>
              <View style={styles.cardActions}>
                <TouchableOpacity>
                  <Image source={require('../assets/editar.png')} style={styles.actionIconImage} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 12 }}>
                  <Image source={require('../assets/excluir.png')} style={styles.actionIconImage} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.smiley}>
                <Image source={require('../assets/diario.png')} style={styles.smileyImage} />
              </View>

              <View style={styles.lines}>
                <View style={styles.line} />
                <View style={styles.line} />
                <View style={styles.line} />
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 120 }} />
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Image source={require('../assets/criar.png')} style={styles.fabFull} resizeMode="contain" />
      </TouchableOpacity>

      <View style={styles.bottomFill} />

      <View style={appStyles.bottomBar}>
        <TouchableOpacity onPress={() => onNavigate && onNavigate('home')}>
          <Image source={require('../assets/home.png')} style={appStyles.bottomIcon} />
        </TouchableOpacity>
        <Image source={require('../assets/agenda.png')} style={appStyles.bottomIcon} />
        <TouchableOpacity onPress={() => onNavigate && onNavigate('diario')}>
          <Image source={require('../assets/diario.png')} style={appStyles.bottomIcon} />
        </TouchableOpacity>
        <Image source={require('../assets/chat.png')} style={appStyles.bottomIcon} />
        <Image source={require('../assets/favoritos.png')} style={appStyles.bottomIcon} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backArrow: { fontSize: 26, color: '#7FB0C8', marginTop: 32 },
  logoPlaceholder: { width: 36, height: 36, borderRadius: 8, marginTop: 32 },
  title: { fontSize: 48, color: '#72AFC6', fontWeight: '700', marginTop: 44, lineHeight: 52 },
  separator: { height: 1, backgroundColor: '#E6DFE6', marginVertical: 12 },
  card: { backgroundColor: '#f8f8f8', borderRadius: 12, padding: 16, marginTop: 12 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardDate: { color: '#7FB0C8', fontSize: 18 },
  cardActions: { flexDirection: 'row' },
  actionIcon: { fontSize: 20, color: '#5EA1BF' },
  actionIconImage: { width: 20, height: 20, tintColor: '#5EA1BF' },
  cardBody: { flexDirection: 'row', marginTop: 12, alignItems: 'center' },
  smiley: { width: 64, height: 64, borderRadius: 32, borderWidth: 6, borderColor: '#7FB0C8', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  smileyFace: { fontSize: 28 },
  smileyImage: { width: 36, height: 36, resizeMode: 'contain', tintColor: '#7FB0C8' },
  lines: { flex: 1, marginLeft: 12 },
  line: { height: 8, backgroundColor: '#E0D7E0', borderRadius: 8, marginVertical: 8 },
  fab: { position: 'absolute', alignSelf: 'center', bottom: 140, width: 88, height: 88, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', zIndex: 20, padding: 0 },
  fabFull: { width: 88, height: 88 },
  bottomFill: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 56, backgroundColor: '#7BA6C7' },
});
