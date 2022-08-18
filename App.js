<<<<<<< HEAD
import * as React from 'react';
import { AppProvider } from './context/appContext';
import MyStack from './MyStack';


const App = () => {
  return (
    <AppProvider>
      <MyStack />
    </AppProvider>
  );
};

export default App 
=======
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
>>>>>>> f1cf74f (Created a new Expo app)
