import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/store';
import MainNavigator from './src/navigation/MainNavigator';
import { init, fetchSession } from './src/db';
import { setUser } from './src/features/auth/authSlice';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // 1. Inicializa la base de datos
        await init();
        console.log('DB inicializada');

        // 2. Buscamos si hay una sesión guardada
        const session = await fetchSession();
        
        if (session) {
          console.log("Sesión encontrada:", session.email);

          dispatch(setUser({
            email: session.email,
            idToken: session.token,
            localId: session.localId
          }));
        }
      } catch (err) {
        console.log('Error al preparar la App:', err);
      }
    };

    prepareApp();
  }, [dispatch]);

  return <MainNavigator />;
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}