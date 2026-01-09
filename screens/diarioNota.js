import React, { useMemo, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../firebase';
import { push, ref, set, update } from 'firebase/database';

function formatLongDate(date) {
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const day = String(date.getDate());
  const month = months[date.getMonth()];
  const year = String(date.getFullYear());
  return `${day} de ${month} de ${year}`;
}

export default function DiarioNota({ onNavigate, route }) {
  const params = route?.params || {};
  const existingNoteId = params.noteId || null;
  const existingText = typeof params.text === 'string' ? params.text : '';

  const [text, setText] = useState(existingText);
  const [saving, setSaving] = useState(false);

  const maxLen = 999;
  const todayLabel = useMemo(() => formatLongDate(new Date()), []);

  async function persistAndGoBack({ silentIfEmpty = false } = {}) {
    const user = auth.currentUser;
    const trimmed = text.trim();

    if (!user) {
      Alert.alert('Erro', 'Você precisa estar logado para salvar notas.');
      onNavigate && onNavigate('back');
      return;
    }

    if (!trimmed) {
      if (!silentIfEmpty) {
        onNavigate && onNavigate('back');
      } else {
        onNavigate && onNavigate('back');
      }
      return;
    }

    try {
      setSaving(true);
      const notesRoot = ref(db, `diaryNotes/${user.uid}`);

      if (existingNoteId) {
        await update(ref(db, `diaryNotes/${user.uid}/${existingNoteId}`), {
          text: trimmed,
          updatedAt: Date.now(),
        });
      } else {
        const newRef = push(notesRoot);
        await set(newRef, {
          text: trimmed,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      }

      onNavigate && onNavigate('back');
    } catch (e) {
      Alert.alert('Erro', e?.message || 'Não foi possível salvar sua nota.');
    } finally {
      setSaving(false);
    }
  }

  function handleBack() {
    // Se o usuário não escreveu nada, apenas volta sem criar nota.
    // Se escreveu, salva automaticamente para não perder.
    if (!text.trim()) {
      onNavigate && onNavigate('back');
      return;
    }

    Alert.alert('Salvar nota?', 'Deseja salvar antes de voltar?', [
      { text: 'Não', style: 'destructive', onPress: () => onNavigate && onNavigate('back') },
      { text: 'Salvar', onPress: () => persistAndGoBack({ silentIfEmpty: true }) },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={handleBack}>
              <Text style={styles.backArrow}>‹</Text>
            </TouchableOpacity>
            <Image source={require('../assets/psifylogo.png')} style={styles.logo} />
          </View>

          <Text style={styles.title}>O que tem{"\n"}passado?</Text>
          <View style={styles.separator} />

          <View style={styles.noteBoxWrap}>
            <Text style={styles.datePill}>{todayLabel}</Text>

            <TouchableOpacity
              onPress={() => setText('')}
              style={styles.clearBtn}
              accessibilityLabel="Limpar texto"
            >
              <Ionicons name="close-circle" size={22} color="#7FB0C8" />
            </TouchableOpacity>

            <TextInput
              style={styles.textArea}
              placeholder="Escreva aqui..."
              placeholderTextColor="#B7B7B7"
              multiline
              value={text}
              onChangeText={(t) => setText(t.slice(0, maxLen))}
              textAlignVertical="top"
              maxLength={maxLen}
            />
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.counter}>{text.length}/{maxLen}</Text>
            <TouchableOpacity
              style={[styles.saveBtn, saving && { opacity: 0.6 }]}
              onPress={() => persistAndGoBack({ silentIfEmpty: true })}
              disabled={saving}
            >
              <Text style={styles.saveBtnText}>{existingNoteId ? 'Salvar' : 'Criar'}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backArrow: { fontSize: 26, color: '#7FB0C8', marginTop: 32 },
  logo: { width: 36, height: 36, borderRadius: 8, marginTop: 32 },
  title: { fontSize: 48, color: '#72AFC6', fontWeight: '700', marginTop: 44, lineHeight: 52 },
  separator: { height: 1, backgroundColor: '#E6DFE6', marginVertical: 12 },

  noteBoxWrap: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#CFC6CF',
    borderRadius: 6,
    paddingTop: 18,
    paddingHorizontal: 12,
    paddingBottom: 12,
    minHeight: 320,
  },
  datePill: {
    position: 'absolute',
    top: -10,
    left: 10,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    color: '#7A7A7A',
    fontSize: 12,
  },
  clearBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 4,
    zIndex: 2,
  },
  textArea: {
    fontSize: 16,
    color: '#333',
    padding: 0,
    marginTop: 8,
    lineHeight: 22,
    minHeight: 280,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  counter: { color: '#7A7A7A', fontSize: 12 },
  saveBtn: {
    backgroundColor: '#7FB0C8',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  saveBtnText: { color: '#fff', fontWeight: '700' },
});
