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