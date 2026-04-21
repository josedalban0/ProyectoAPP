import { Provider } from 'react-redux';
import { store } from './src/store';
import { init } from './src/db';
// Aquí luego importaremos el MainNavigator de src/navigation

// Inicializamos la base de datos SQLite (Persistencia offline)
init()
  .then(() => console.log('Base de datos inicializada'))
  .catch(err => console.log('Fallo al inicializar DB', err));

export default function App() {
  return (
    <Provider store={store}>
      {/* Aquí irá tu Navegación principal */}
      {/* <MainNavigator /> */}
    </Provider>
  );
}