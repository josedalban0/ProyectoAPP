import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen'; // Nueva pantalla

import { clearUser } from '../features/auth/authSlice';
import { deleteSession } from '../db';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    deleteSession();
    dispatch(clearUser());
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={({ navigation }) => ({ 
                title: 'Mi E-Commerce',
                headerLeft: () => (
                  <TouchableOpacity 
                    style={styles.headerButton} 
                    onPress={() => navigation.navigate('Profile')}
                  >
                    <Text style={styles.profileText}>Perfil</Text>
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity 
                    style={styles.headerButton} 
                    onPress={handleLogout}
                  >
                    <Text style={styles.logoutText}>Salir</Text>
                  </TouchableOpacity>
                ),
              })} 
            />
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen} 
              options={{ title: 'Mi Perfil' }} 
            />
          </>
        ) : (
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} 
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    paddingHorizontal: 15,
  },
  profileText: {
    color: '#4A90E2',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutText: {
    color: '#f44336',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default MainNavigator;