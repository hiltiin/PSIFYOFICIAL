import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../firebase';
import { ref, get, set, push } from 'firebase/database';

export default function HorarioScreen({ onNavigate }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [professionalLabel, setProfessionalLabel] = useState('Psicólogo');

  const times = useMemo(() => {
    const out = [];
    for (let h = 8; h <= 17; h++) {
      out.push(`${String(h).padStart(2, '0')}:00`);
    }
    return out;
  }, []);

  useEffect(() => {
    const loadProfessional = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const snap = await get(ref(db, `users/${user.uid}/selectedProfessional`));
        if (!snap.exists()) return;
        const data = snap.val() || {};
        const label = data?.name ? data.name : 'Psicólogo';
        setProfessionalLabel(label);
      } catch (err) {
        console.warn('Erro ao carregar profissional:', err);
      }
    };
    loadProfessional();
  }, []);

  const saveAppointment = async (timeStr) => {
    const user = auth.currentUser;
    if (!user) return;

    const [dateSnap, profSnap] = await Promise.all([
      get(ref(db, `users/${user.uid}/selectedServiceDate`)),
      get(ref(db, `users/${user.uid}/selectedProfessional`)),
    ]);

    const date = dateSnap.exists() ? String(dateSnap.val()) : '';
    const professional = profSnap.exists() ? (profSnap.val() || {}) : {};

    const createdAt = new Date().toISOString();
    const listRef = ref(db, `users/${user.uid}/appointments`);
    const newRef = push(listRef);

    await set(newRef, {
      date,
      time: String(timeStr),
      professional: {
        name: professional?.name || '',
        email: professional?.email || '',
      },
      createdAt,
    });
  };

  return (
    <View style={s.container}>
      <View style={s.topRow}>
        <TouchableOpacity onPress={() => onNavigate && onNavigate('back')} style={s.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#5d9cbf" />
        </TouchableOpacity>

        <Image source={require('../assets/psifylogo.png')} style={s.logo} />
      </View>

      <Text style={s.psicologo}>{professionalLabel}</Text>

      <Text style={s.title}>
        Selecione o{"\n"}
        horário
      </Text>

      <Text style={s.subtitle}>
        Os horários em que este profissional está{"\n"}
        disponível encontram-se discriminados{"\n"}
        abaixo.
      </Text>

      <TouchableOpacity style={s.dropdown} onPress={() => setDropdownOpen((v) => !v)}>
        <Text style={s.dropdownText}>{selectedTime ? selectedTime : 'Horários'}</Text>
        <Ionicons name={dropdownOpen ? 'chevron-up' : 'chevron-down'} size={18} color="#5d9cbf" />
      </TouchableOpacity>

      {dropdownOpen && (
        <View style={s.dropdownList}>
          <ScrollView style={s.dropdownScroll} showsVerticalScrollIndicator={false}>
            {times.map((t) => (
              <TouchableOpacity
                key={t}
                style={s.dropdownItem}
                onPress={() => {
                  setSelectedTime(t);
                  setDropdownOpen(false);
                }}
              >
                <Text style={s.dropdownItemText}>{t}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <TouchableOpacity
        style={[s.button, !selectedTime && s.buttonDisabled]}
        disabled={!selectedTime}
        onPress={async () => {
          try {
            await saveAppointment(selectedTime);
            onNavigate && onNavigate('solicitacao');
          } catch (err) {
            console.warn('Erro ao salvar solicitação:', err);
          }
        }}
      >
        <Text style={s.buttonText}>Agendar</Text>
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
  psicologo: {
    color: '#5d9cbf',
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    marginTop: 12,
  },
  title: {
    color: '#5d9cbf',
    fontSize: 34,
    fontFamily: 'Poppins_700Bold',
    marginTop: 18,
    lineHeight: 40,
  },
  subtitle: {
    color: '#7BA6C7',
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    marginTop: 14,
    lineHeight: 18,
  },
  dropdown: {
    marginTop: 22,
    borderWidth: 3,
    borderColor: '#7BA6C7',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    color: '#5d9cbf',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  dropdownList: {
    width: '100%',
    borderWidth: 3,
    borderColor: '#7BA6C7',
    borderRadius: 12,
    marginTop: 8,
    overflow: 'hidden',
    maxHeight: 220,
  },
  dropdownScroll: {
    width: '100%',
  },
  dropdownItem: {
    height: 44,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  dropdownItemText: {
    color: '#5d9cbf',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  button: {
    marginTop: 18,
    alignSelf: 'center',
    backgroundColor: '#7BA6C7',
    paddingHorizontal: 34,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
  },
  wave: {
    position: 'relative',
    left: 15,
    right: 120,
    bottom: 0,
    width: '100%',
    height: 260,
    resizeMode: 'cover',
  },
});
