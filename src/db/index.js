import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('sessions.db');

// 1. Para inicializar en App.js
export const init = () => {
  return new Promise((resolve, reject) => {
    try {
      db.withTransactionSync(() => {
        db.execSync(
          'CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL);'
        );
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

// 2. Para guardar logueo de LoginScreen.js
export const insertSession = ({ localId, email, token }) => {
  return new Promise((resolve, reject) => {
    try {
      db.withTransactionSync(() => {
        db.execSync('DELETE FROM sessions;'); 
        db.runSync(
          'INSERT INTO sessions (localId, email, token) VALUES (?, ?, ?);',
          [localId, email, token]
        );
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

// 3. auto-login en App.js
export const fetchSession = () => {
  try {
    const allRows = db.getAllSync('SELECT * FROM sessions;');
    return allRows[0]; 
  } catch (error) {
    console.log("Error al buscar sesión:", error);
    return null;
  }
};

// 4. Para despues hacer un boton de logout
export const deleteSession = () => {
  db.runSync('DELETE FROM sessions;');
};