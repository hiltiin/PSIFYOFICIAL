import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { styles as appStyles } from '../Styles/styles';
import { auth, db } from '../firebase';
import { ref, get, set } from 'firebase/database';
import { useIsFocused } from '@react-navigation/native';

const agendaStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 56,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  scrollContent: {
    paddingBottom: 170,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  title: {
    flex: 1,
    fontSize: 24,
    color: '#5EA1BF',
    fontWeight: '700',
    fontFamily: 'Poppins_700Bold',
    marginTop: 0,
    marginBottom: 0,
  },
  titleBold: {
    fontWeight: 'bold',
    color: '#5EA1BF',
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  subtitle: {
    color: '#5EA1BF',
    fontSize: 14,
    marginBottom: 12,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 0,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'left',
  },
  divider: {
    height: 2,
    backgroundColor: '#5EA1BF',
    marginVertical: 15,
    marginHorizontal: 16,
    borderRadius: 2,
  },
  calendarContainer: {
    backgroundColor: '#7BA6C7',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  month: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
  },
  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    marginLeft: -2,
    alignSelf: 'center',
    width: 276,
  },
  weekday: {
    color: '#fff',
    fontWeight: '700',
    width: 32,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    marginHorizontal: 2,
  },
  daysGrid: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 260,
    alignSelf: 'center',
    marginTop: 6,
    marginRight: 20,
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  dayText: {
    color: '#5EA1BF',
    fontWeight: '700',
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
  },
  dayCircleSelected: {
    backgroundColor: '#5EA1BF',
  },
  dayTextSelected: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#7BA6C7',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
  },
  bottomBar: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#7BA6C7',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: 56,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    marginBottom: 24,
  },
  bottomFill: {
    width: '100%',
    height: 24,
    backgroundColor: '#7BA6C7',
  },
  bottomIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    marginHorizontal: 10,
  },
  emptyText: {
    color: '#7BA6C7',
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    marginLeft: 16,
    marginTop: 6,
  },
  cardTitle: {
    color: '#3A6B8E',
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 2,
  },
  cardSub: {
    color: '#7BA6C7',
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 2,
  },
});
export default function Agenda({ onNavigate }) {
  const [selectedDays, setSelectedDays] = useState([]);
  const [displayedYear, setDisplayedYear] = useState(new Date().getFullYear());
  const [displayedMonth, setDisplayedMonth] = useState(new Date().getMonth());
  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);

  const isFocused = useIsFocused();

  const hasUserInteractedRef = useRef(false);

  const monthNames = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

  const formatDate = (y, m, d) => {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  const uniqueStrings = (arr) => Array.from(new Set((arr || []).map((v) => String(v))));

  const loadAppointments = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      setAppointmentsLoading(true);
      const snap = await get(ref(db, `users/${user.uid}/appointments`));
      if (!snap.exists()) {
        setAppointments([]);
        return;
      }

      const data = snap.val() || {};
      const items = Object.entries(data).map(([id, value]) => ({
        id,
        ...(value || {}),
      }));

      items.sort((a, b) => {
        const aKey = `${a.date || '9999-12-31'} ${a.time || '99:99'}`;
        const bKey = `${b.date || '9999-12-31'} ${b.time || '99:99'}`;
        return aKey.localeCompare(bKey);
      });

      setAppointments(items);
    } catch (err) {
      console.warn('Erro ao carregar consultas:', err);
    } finally {
      setAppointmentsLoading(false);
    }
  };

  useEffect(() => {
    const loadSelected = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const snap = await get(ref(db, `users/${user.uid}/selectedDays`));
        if (snap.exists()) {
          const data = snap.val();
          let values = [];
          if (Array.isArray(data)) values = data;
          else if (data) values = Object.values(data);

          const normalized = values.map((v) => {
            if (typeof v === 'number') {
              const d = new Date();
              return formatDate(d.getFullYear(), d.getMonth(), Number(v));
            }
            if (/^\d{4}-\d{2}-\d{2}$/.test(String(v))) return String(v);
            const n = Number(v);
            if (!isNaN(n)) {
              const d = new Date();
              return formatDate(d.getFullYear(), d.getMonth(), n);
            }
            return String(v);
          });
          setSelectedDays((prev) => {
            if (hasUserInteractedRef.current) {
              return uniqueStrings([...(prev || []), ...normalized]);
            }
            return uniqueStrings(normalized);
          });
        }
      } catch (err) {
        console.warn('Erro ao carregar seleções:', err);
      }
    };
    loadSelected();
  }, []);

  useEffect(() => {
    if (!isFocused) return;
    loadAppointments();
  }, [isFocused]);

  const persistSelected = async (days) => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const normalized = uniqueStrings(days);
      await set(ref(db, `users/${user.uid}/selectedDays`), normalized);
    } catch (err) {
      console.warn('Erro ao salvar seleções:', err);
    }
  };

  const saveClickedDate = async (dateStr) => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      await set(ref(db, `users/${user.uid}/selectedServiceDate`), String(dateStr));
    } catch (err) {
      console.warn('Erro ao salvar data clicada:', err);
    }
  };

  useEffect(() => {
    if (!hasUserInteractedRef.current) return;
    persistSelected(selectedDays);
  }, [selectedDays]);

  const toggleDay = (dayNumber) => {
    const dateStr = formatDate(displayedYear, displayedMonth, dayNumber);
    hasUserInteractedRef.current = true;
    setSelectedDays((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      if (safePrev.includes(dateStr)) return safePrev.filter((d) => d !== dateStr);
      return [...safePrev, dateStr];
    });
  };

  const onClickDay = async (dayNumber) => {
    const dateStr = formatDate(displayedYear, displayedMonth, dayNumber);
    await saveClickedDate(dateStr);
    toggleDay(dayNumber);
    onNavigate && onNavigate('profissionais');
  };

  const onPressMonth = () => {
    const today = new Date();
    const maxIndex = today.getFullYear() * 12 + today.getMonth() + 2;
    const currentIndex = displayedYear * 12 + displayedMonth;
    if (currentIndex < maxIndex) {
      const nextIndex = currentIndex + 1;
      setDisplayedYear(Math.floor(nextIndex / 12));
      setDisplayedMonth(nextIndex % 12);
    } else {
      setDisplayedYear(today.getFullYear());
      setDisplayedMonth(today.getMonth());
    }
  };
  return (
    <View style={agendaStyles.container}>
      <ScrollView contentContainerStyle={agendaStyles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={agendaStyles.header}>
          <Text style={agendaStyles.title}><Text style={agendaStyles.titleBold}>Seu calendário{"\n"}particular</Text></Text>
          <Image source={require('../assets/psifylogo.png')} style={agendaStyles.logo} />
        </View>
        <Text style={agendaStyles.subtitle}>
          Aqui você pode ver suas consultas agendadas, marcar novas, além de remarcar e cancelá-las.
        </Text>
        <View style={agendaStyles.divider} />

        <View style={agendaStyles.calendarContainer}>
          <TouchableOpacity onPress={onPressMonth}>
            <Text style={agendaStyles.month}>{monthNames[displayedMonth]} {displayedYear}</Text>
          </TouchableOpacity>
          <View style={agendaStyles.weekdaysRow}>
            {['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'].map((d) => (
              <Text key={d} style={agendaStyles.weekday}>{d}</Text>
            ))}
          </View>
          <View style={agendaStyles.daysGrid}>
            {(() => {
              const firstDayOfWeek = new Date(displayedYear, displayedMonth, 1).getDay();
              const daysInMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();
              const weeks = [];
              let day = 1;
              for (let w = 0; w < 6; w++) {
                const daysRow = [];
                for (let d = 0; d < 7; d++) {
                  if (w === 0 && d < firstDayOfWeek) {
                    daysRow.push(<View key={`empty-${w}-${d}`} style={{ width: 32, height: 32, margin: 4 }} />);
                  } else if (day > daysInMonth) {
                    daysRow.push(<View key={`empty-${w}-${d}`} style={{ width: 32, height: 32, margin: 4 }} />);
                  } else {
                    const dayValue = day;
                    const dateStr = formatDate(displayedYear, displayedMonth, dayValue);
                    const isSelected = selectedDays.includes(dateStr);
                    daysRow.push(
                      <TouchableOpacity
                        key={dayValue}
                        onPress={() => onClickDay(dayValue)}
                        style={[agendaStyles.dayCircle, isSelected && agendaStyles.dayCircleSelected]}
                      >
                        <Text style={[agendaStyles.dayText, isSelected && agendaStyles.dayTextSelected]}>{dayValue}</Text>
                      </TouchableOpacity>
                    );
                    day++;
                  }
                }
                weeks.push(
                  <View key={w} style={{ flexDirection: 'row', justifyContent: 'space-between', width: 260 }}>
                    {daysRow}
                  </View>
                );
              }
              return weeks;
            })()}
          </View>
        </View>

        <Text style={[appStyles.sectionTitle, { marginTop: 6 }]}>Consultas agendadas</Text>
        {appointmentsLoading ? (
          <Text style={agendaStyles.emptyText}>Carregando...</Text>
        ) : appointments.length === 0 ? (
          <Text style={agendaStyles.emptyText}>Nenhuma consulta agendada.</Text>
        ) : (
          appointments.map((a) => (
            <View key={a.id} style={appStyles.card}>
              <Image source={require('../assets/perfil do psicologo.png')} style={appStyles.psychologistIcon} />
              <View style={appStyles.cardTextContainer}>
                <Text style={agendaStyles.cardTitle}>{a?.professional?.name || 'Profissional'}</Text>
                <Text style={agendaStyles.cardSub}>{a?.professional?.email || ''}</Text>
                <Text style={agendaStyles.cardSub}>{`${a?.date || ''} ${a?.time || ''}`.trim()}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <View style={appStyles.bottomFill} />
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
    </View>
  );
}

