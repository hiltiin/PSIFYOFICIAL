import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CadastroScreen from './screens/cadastro';
import LoginScreen from './screens/login';
import WelcomeScreen from './screens/welcome';
import Onboarding2Screen from './screens/onboarding2';
import Onboarding3Screen from './screens/onboarding3';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

const Stack = createNativeStackNavigator();

const defaultScreenOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

function withOnNavigate(Component) {
  return function Wrapped({ navigation }) {
    function onNavigate(to) {
      if (to && typeof to === 'object') {
        if (to.type === 'reset' && typeof to.to === 'string') {
          navigation.reset({ index: 0, routes: [{ name: to.to }] });
        }
        return;
      }

      if (to === 'back') {
        navigation.goBack();
        return;
      }

      if (typeof to === 'string') {
        navigation.navigate(to);
      }
    }

    return <Component onNavigate={onNavigate} />;
  };
}

const Welcome = withOnNavigate(WelcomeScreen);
const Onboarding2 = withOnNavigate(Onboarding2Screen);
const Onboarding3 = withOnNavigate(Onboarding3Screen);
const Login = withOnNavigate(LoginScreen);
const Cadastro = withOnNavigate(CadastroScreen);

export default function App() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="welcome" screenOptions={defaultScreenOptions}>
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="onboarding2" component={Onboarding2} />
        <Stack.Screen name="onboarding3" component={Onboarding3} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="cadastro" component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}