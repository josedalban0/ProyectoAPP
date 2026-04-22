import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileImage, setUserLocation } from '../features/auth/authSlice';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user, profileImage, location } = useSelector((state) => state.auth);

  // Función para la Cámara
  const verifyPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permisos insuficientes", "Necesitamos permiso para usar la cámara");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const isCameraOk = await verifyPermissions();
    if (!isCameraOk) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      dispatch(setProfileImage(result.assets[0].uri));
    }
  };

  // Función para la Ubicación
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permisos insuficientes", "Necesitamos el GPS para el envío");
      return;
    }

    const locationData = await Location.getCurrentPositionAsync({});
    // Obtenemos el nombre de la ciudad
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: locationData.coords.latitude,
      longitude: locationData.coords.longitude,
    });

    const city = reverseGeocode[0]?.city || "Ubicación desconocida";
    dispatch(setUserLocation(city));
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}><Text>Sin foto</Text></View>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Tomar Foto de Perfil</Text>
      </TouchableOpacity>

      <Text style={styles.email}>Usuario: {user}</Text>
      
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>
          📍 Ciudad de envío: {location ? location : 'No definida'}
        </Text>
        <TouchableOpacity style={styles.buttonLoc} onPress={getLocation}>
          <Text style={styles.buttonText}>Actualizar Ubicación</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  imageContainer: { marginTop: 40, marginBottom: 20 },
  image: { width: 150, height: 150, borderRadius: 75 },
  placeholder: { width: 150, height: 150, borderRadius: 75, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
  email: { fontSize: 18, marginVertical: 20, fontWeight: '500' },
  button: { backgroundColor: '#4A90E2', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  buttonLoc: { backgroundColor: '#34C759', padding: 10, borderRadius: 10, marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  locationContainer: { marginTop: 30, alignItems: 'center', width: '100%' },
  locationText: { fontSize: 16, color: '#666' }
});

export default ProfileScreen;