import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import CategoriesScreen from '../screens/CategoriesScreen';
import HomeScreen from '../screens/HomeScreen';
import ItemDetail from '../screens/ItemDetail';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';

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
              name="Categories" 
              component={CategoriesScreen} 
              options={({ navigation }) => ({ 
                title: 'Categorías',
                headerLeft: () => (
                  <TouchableOpacity 
                    style={styles.headerButton} 
                    onPress={() => navigation.navigate('Profile')}
                  >
                    <Text style={styles.profileText}>Perfil</Text>
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <View style={styles.headerRightContainer}>
                    <TouchableOpacity 
                      style={styles.headerButton} 
                      onPress={() => navigation.navigate('Cart')}
                    >
                      <Text style={styles.cartIcon}>🛒</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.headerButton} 
                      onPress={handleLogout}
                    >
                      <Text style={styles.logoutText}>Salir</Text>
                    </TouchableOpacity>
                  </View>
                ),
              })} 
            />
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={({ route }) => ({ title: route.params?.category || 'Productos' })} 
            />
            <Stack.Screen 
              name="Detail" 
              component={ItemDetail} 
              options={{ title: 'Detalle' }} 
            />
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen} 
              options={{ title: 'Mi Perfil' }} 
            />
            <Stack.Screen 
              name="Cart" 
              component={CartScreen} 
              options={{ title: 'Mi Carrito' }} 
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
  headerButton: { paddingHorizontal: 10 },
  headerRightContainer: { flexDirection: 'row', alignItems: 'center' },
  profileText: { color: '#4A90E2', fontWeight: 'bold', fontSize: 16 },
  logoutText: { color: '#f44336', fontWeight: 'bold', fontSize: 16 },
  cartIcon: { fontSize: 22 }
});

export default MainNavigator;