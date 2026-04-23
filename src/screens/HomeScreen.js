import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import { useGetProductsQuery } from '../services/shopService';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const dispatch = useDispatch();

  const onAddToCart = (item) => {
    dispatch(addItem(item));
    Alert.alert(
      "¡Éxito!",
      `${item.title} se agregó al carrito.`,
      [{ text: "Ok" }]
    );
  };

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.image} 
        resizeMode="contain" 
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => onAddToCart(item)}
      >
        <Text style={styles.buttonText}>Agregar al carrito</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error al cargar los productos. Reintentá luego.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products ? Object.values(products) : []}
        renderItem={renderProduct}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { 
    flex: 1, 
    padding: 15, 
    margin: 10, 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 8,
  },
  title: { fontSize: 14, fontWeight: 'bold', color: '#333', textAlign: 'center', height: 40 },
  price: { color: '#4A90E2', fontWeight: 'bold', marginVertical: 5 },
  button: { backgroundColor: '#4A90E2', padding: 8, borderRadius: 5, marginTop: 5 },
  buttonText: { color: '#fff', fontSize: 12, fontWeight: '600' }
});

export default HomeScreen;