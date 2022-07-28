import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home';
import OtoparkScreen from './screens/otopark';
import AracScreen from './screens/arac';
import ProfilScreen from './screens/profil';
import UyeScreen from './screens/uye';
import KayıtlıUyeScreen from './screens/kayıtlıUye';
import { AppProvider } from './context/appContext';



const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Otopark" component={OtoparkScreen}/>
          <Stack.Screen name="Arac" component={AracScreen}/>
          <Stack.Screen name="Profil" component={ProfilScreen}/>
          <Stack.Screen name="Uye" component={UyeScreen}/>
          <Stack.Screen name="KayıtlıUye" component={KayıtlıUyeScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default MyStack 