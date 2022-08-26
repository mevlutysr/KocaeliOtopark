import * as React from 'react';
import MyStack from './MyStack';
import { store } from './store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <MyStack />
    </Provider>
    
  );
};

export default App 