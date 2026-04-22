import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLoginMutation, useSignUpMutation } from '../services/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import { insertSession } from '../db';

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [signUp, { isLoading: isSignUpLoading }] = useSignUpMutation();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    // Validación básica antes de enviar a Firebase
    if (!email || !password) {
      Alert.alert("Atención", "Por favor, completa todos los campos.");
      return;
    }

    try {
      const payload = { email, password, returnSecureToken: true };
      const data = isLogin 
        ? await login(payload).unwrap() 
        : await signUp(payload).unwrap();

      // 1. Actualizamos Redux
      dispatch(setUser({
        email: data.email,
        idToken: data.idToken,
        localId: data.localId
      }));

      // 2. Persistimos en SQLite
      await insertSession({
        localId: data.localId,
        email: data.email,
        token: data.idToken
      });
      
      console.log("Sesión persistida con éxito");
      Alert.alert("¡Éxito!", isLogin ? `Bienvenido ${data.email}` : "Cuenta creada con éxito");
      
    } catch (err) {
      console.log("Error detallado:", err);
      
      // Traducción de errores de Firebase
      let mensajeAmigable = "Ocurrió un error. Intenta de nuevo.";
      const errorCode = err.data?.error?.message;

      if (errorCode === "INVALID_LOGIN_CREDENTIALS") {
        mensajeAmigable = "Email o contraseña incorrectos.";
      } else if (errorCode === "EMAIL_EXISTS") {
        mensajeAmigable = "Este email ya está registrado.";
      } else if (errorCode.includes("WEAK_PASSWORD")) {
        mensajeAmigable = "La contraseña debe tener al menos 6 caracteres.";
      } else if (errorCode === "INVALID_EMAIL") {
        mensajeAmigable = "El formato del email no es válido.";
      } else if (errorCode === "USER_NOT_FOUND") {
        mensajeAmigable = "No existe un usuario con este email.";
      } else if (errorCode === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        mensajeAmigable = "Demasiados intentos fallidos. Intenta más tarde.";
      }

      Alert.alert("Error de Autenticación", mensajeAmigable);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Iniciar Sesión' : 'Registro'}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {(isLoginLoading || isSignUpLoading) ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{isLogin ? 'Ingresar' : 'Crear cuenta'}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={styles.switchContainer}>
        <Text style={styles.switchText}>
          {isLogin ? '¿No tenés cuenta? Registrate' : '¿Ya tenés cuenta? Iniciá sesión'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#4A90E2', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  switchContainer: { marginTop: 20, alignItems: 'center' },
  switchText: { color: '#4A90E2', fontWeight: '600' }
});

export default LoginScreen;