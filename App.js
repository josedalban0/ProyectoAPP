import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import MainNavigator from './src/navigation/MainNavigator';
import { init } from './src/db';

export default function App() {
  
  // Ejecutamos la inicialización al montar la App
  useEffect(() => {
    init()
      .then(() => console.log('Base de datos inicializada correctamente'))
      .catch(err => console.log('Fallo al iniciar DB:', err));
  }, []);

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}