import * as SQLite from 'expo-sqlite';

// Esta es la forma correcta para Expo 2026
const db = SQLite.openDatabaseSync('sessions.db');

export const init = () => {
  return new Promise((resolve, reject) => {
    try {
      db.withTransactionSync(() => {
        db.execSync(
          'CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL);'
        );
      });
      console.log("Base de datos lista");
      resolve();
    } catch (error) {
      console.log("Error al inicializar DB:", error);
      reject(error);
    }
  });
};