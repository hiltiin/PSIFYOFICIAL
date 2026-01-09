import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { styles as appStyles } from '../Styles/styles';

const agendaStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 56,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingHorizontal: 16,
  },
  title: {
    flex: 1,
    fontSize: 28,
    color: '#5EA1BF',
    fontWeight: 'bold',
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
    fontSize: 15,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 0,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'left',
  },
  divider: {
    height: 2,
    backgroundColor: '#5EA1BF',
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 2,
  },
  calendarContainer: {
    backgroundColor: '#7BA6C7',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 4,
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
    justifyContent: 'center',
    marginBottom: 2,
    alignSelf: 'center',
    gap: 6,
  },
  weekday: {
    color: '#fff',
    fontWeight: 'bold',
    width: 28,
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
    marginHorizontal: 2,
  },
  daysGrid: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 230,
    alignSelf: 'center',
    marginTop: 0,
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  dayText: {
    color: '#5EA1BF',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
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
});
export default function Agenda({ onNavigate }) {
  return (
    <View style={agendaStyles.container}>
      {/* Header */}
      <View style={agendaStyles.header}>
        <Text style={agendaStyles.title}><Text style={agendaStyles.titleBold}>Seu calendário{"\n"}particular</Text></Text>
        <Image source={require('../assets/psifylogo.png')} style={agendaStyles.logo} />
      </View>
      <Text style={agendaStyles.subtitle}>
        Aqui você pode ver suas consultas agendadas, marcar novas, além de remarcar e cancelá-las.
      </Text>
      <View style={agendaStyles.divider} />
      {/* Calendar */}
      <View style={agendaStyles.calendarContainer}>
        <Text style={agendaStyles.month}>Janeiro</Text>
        <View style={agendaStyles.weekdaysRow}>
          {['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'].map((d) => (
            <Text key={d} style={agendaStyles.weekday}>{d}</Text>
          ))}
        </View>
        <View style={agendaStyles.daysGrid}>
          {(() => {
            const firstDayOfWeek = 4;
            const daysInMonth = 31;
            const weeks = [];
            let day = 1;
            for (let w = 0; w < 6; w++) {
              const daysRow = [];
              for (let d = 0; d < 7; d++) {
                if (w === 0 && d < firstDayOfWeek) {
                  daysRow.push(<View key={`empty-${w}-${d}`} style={{ width: 38, height: 38, margin: 3 }} />);
                } else if (day > daysInMonth) {
                  daysRow.push(<View key={`empty-${w}-${d}`} style={{ width: 38, height: 38, margin: 3 }} />);
                } else {
                  daysRow.push(
                    <View key={day} style={agendaStyles.dayCircle}>
                      <Text style={agendaStyles.dayText}>{day}</Text>
                    </View>
                  );
                  day++;
                }
              }
              weeks.push(
                <View key={w} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  {daysRow}
                </View>
              );
            }
            return weeks;
          })()}
        </View>
      </View>
      {/* Agendar Button */}
      <TouchableOpacity style={agendaStyles.button}>
        <Text style={agendaStyles.buttonText}>Agendar</Text>
      </TouchableOpacity>
      {/* Bottom Tab Bar igual home.js */}
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

