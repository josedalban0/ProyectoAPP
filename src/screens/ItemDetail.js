import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

const ItemDetail = ({ route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();

  const onAddToCart = () => {
    dispatch(addItem(product));
    Alert.alert("¡Éxito!", "Producto agregado al carrito.");
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>Producto original de alta calidad disponible en nuestra tienda.</Text>
        <TouchableOpacity style={styles.button} onPress={onAddToCart}>
          <Text style={styles.buttonText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 350, backgroundColor: '#f9f9f9' },
  info: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  price: { fontSize: 28, fontWeight: 'bold', color: '#4A90E2', marginVertical: 10 },
  description: { fontSize: 16, color: '#666', lineHeight: 24, marginBottom: 30 },
  button: { backgroundColor: '#4A90E2', padding: 18, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default ItemDetail;