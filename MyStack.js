import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import AppLoader from './loader/AppLoader';
import HomeScreen from './screens/home';
import OtoparkScreen from './screens/otopark';
import AracScreen from './screens/arac';
import ProfilScreen from './screens/profil';
import UyeScreen from './screens/uye';
import KayıtlıUyeScreen from './screens/kayitliUye';
import PlakaScreen from './screens/plaka';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  
  const load = useSelector((state) => state.Slice.Loader)

  return (
    <>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Otopark" component={OtoparkScreen}/>
        <Stack.Screen name="Arac" component={AracScreen}/>
        <Stack.Screen name="Profil" component={ProfilScreen}/>
        <Stack.Screen name="Uye" component={UyeScreen}/>
        <Stack.Screen name="KayıtlıUye" component={KayıtlıUyeScreen}/>
        <Stack.Screen name="Plaka" component={PlakaScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    {load ? <AppLoader/> : null}
    </>
  );
};

export default MyStack 