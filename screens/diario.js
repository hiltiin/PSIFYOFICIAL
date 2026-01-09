import React, { useEffect, useMemo, useState } from 'react';
import { Alert, SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { styles as appStyles } from '../Styles/styles';
import { auth, db } from '../firebase';
import { onValue, ref, remove, update } from 'firebase/database';
import DiarioEmojiSelectableIcon from '../components/DiarioEmojiSelectableIcon';

function formatCardDate(date) {
  const weekdays = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
  const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const wd = weekdays[date.getDay()];
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = months[date.getMonth()];
  return `${wd}, ${dd} de ${mm}`;
}

export default function Diario({ onNavigate, current = 'diario' }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) {
      setNotes([]);
      setLoading(false);
      return;
    }

    const notesRef = ref(db, `diaryNotes/${uid}`);
    const unsub = onValue(
      notesRef,
      (snap) => {
        const val = snap.val();
        if (!val) {
          setNotes([]);
          setLoading(false);
          return;
        }

        const list = Object.entries(val).map(([id, item]) => ({
          id,
          text: item?.text || '',
          emoji: item?.emoji || '',
          createdAt: item?.createdAt || 0,
          updatedAt: item?.updatedAt || 0,
        }));

        list.sort((a, b) => (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt));
        setNotes(list);
        setLoading(false);
      },
      (err) => {
        console.warn('Erro ao carregar notas:', err);
        setNotes([]);
        setLoading(false);
      },
    );

    return () => unsub();
  }, [uid]);

  const empty = useMemo(() => !loading && notes.length === 0, [loading, notes.length]);

  function openCreate() {
    onNavigate && onNavigate({ to: 'diarioNota' });
  }

  function openEdit(note) {
    onNavigate && onNavigate({ to: 'diarioNota', params: { noteId: note.id, text: note.text } });
  }

  async function deleteNote(note) {
    if (!uid) return;
    try {
      await remove(ref(db, `diaryNotes/${uid}/${note.id}`));
    } catch (e) {
      Alert.alert('Erro', e?.message || 'Não foi possível excluir a nota.');
    }
  }

  async function setNoteEmoji(note, emoji) {
    if (!uid) return;
    try {
      await update(ref(db, `diaryNotes/${uid}/${note.id}`), {
        emoji: emoji || null,
        updatedAt: Date.now(),
      });
    } catch (e) {
      Alert.alert('Erro', e?.message || 'Não foi possível salvar o emoji.');
    }
  }

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

        {empty && (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyTitle}>Sem notas ainda</Text>
            <Text style={styles.emptyText}>Toque em “criar” para escrever sua primeira nota.</Text>
          </View>
        )}

        {!empty &&
          notes.map((note) => {
            const ts = note.updatedAt || note.createdAt;
            const dateLabel = ts ? formatCardDate(new Date(ts)) : 'Sem data';
            const preview = (note.text || '').replace(/\s+/g, ' ').trim();
            return (
              <View key={note.id} style={styles.card}>
                <View style={styles.cardHeaderRow}>
                  <Text style={styles.cardDate}>{dateLabel}</Text>
                  <View style={styles.cardActions}>
                    <TouchableOpacity onPress={() => openEdit(note)}>
                      <Image source={require('../assets/editar.png')} style={styles.actionIconImage} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginLeft: 12 }}
                      onPress={() =>
                        Alert.alert('Excluir nota', 'Tem certeza que deseja excluir?', [
                          { text: 'Cancelar', style: 'cancel' },
                          { text: 'Excluir', style: 'destructive', onPress: () => deleteNote(note) },
                        ])
                      }
                    >
                      <Image source={require('../assets/excluir.png')} style={styles.actionIconImage} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.smiley}>
                    <DiarioEmojiSelectableIcon
                      pickerTrigger="press"
                      style={styles.smileyImage}
                      value={note.emoji || ''}
                      onChange={(e) => setNoteEmoji(note, e)}
                    />
                  </View>

                  <View style={styles.lines}>
                    <Text numberOfLines={3} style={styles.previewText}>
                      {preview || '—'}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}

        <View style={{ height: 120 }} />
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={openCreate}>
        <Image source={require('../assets/criar.png')} style={styles.fabFull} resizeMode="contain" />
      </TouchableOpacity>

      <View style={styles.bottomFill} />

      <View style={appStyles.bottomBar}>
        <TouchableOpacity onPress={() => onNavigate && onNavigate('home')}>
          <Image source={require('../assets/home.png')} style={appStyles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onNavigate && onNavigate('agenda')}>
          <Image source={require('../assets/agenda.png')} style={appStyles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onNavigate && onNavigate('diario')}>
          <Image source={require('../assets/diario.png')} style={appStyles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onNavigate && onNavigate('chat')}>
          <Image source={require('../assets/chat.png')} style={appStyles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onNavigate && onNavigate('favoritos')}>
          <Image source={require('../assets/favoritos.png')} style={appStyles.bottomIcon} />
        </TouchableOpacity>
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
  emptyWrap: { paddingVertical: 24 },
  emptyTitle: { color: '#72AFC6', fontSize: 18, fontWeight: '700' },
  emptyText: { color: '#7A7A7A', marginTop: 6 },
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
  previewText: { color: '#666', fontSize: 14, lineHeight: 20 },
  fab: { position: 'absolute', alignSelf: 'center', bottom: 140, width: 88, height: 88, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', zIndex: 20, padding: 0 },
  fabFull: { width: 88, height: 88 },
  bottomFill: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 56, backgroundColor: '#7BA6C7' },
});
