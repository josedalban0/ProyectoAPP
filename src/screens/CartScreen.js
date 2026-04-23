import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../features/cart/cartSlice';

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.cartImage} />
      <View style={styles.cartDetails}>
        <Text style={styles.cartTitle}>{item.title}</Text>
        <Text style={styles.cartPrice}>Cant: {item.quantity} - ${item.price * item.quantity}</Text>
      </View>
      <TouchableOpacity onPress={() => dispatch(removeItem(item.id))}>
        <Text style={styles.deleteButton}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>El carrito está vacío</Text>}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${total}</Text>
        <TouchableOpacity style={styles.confirmButton} onPress={() => alert("Compra confirmada")}>
          <Text style={styles.confirmText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  cartItem: { flexDirection: 'row', padding: 10, marginBottom: 10, backgroundColor: '#f9f9f9', borderRadius: 10, alignItems: 'center' },
  cartImage: { width: 50, height: 50, borderRadius: 5 },
  cartDetails: { flex: 1, marginLeft: 10 },
  cartTitle: { fontWeight: 'bold' },
  cartPrice: { color: '#666' },
  deleteButton: { color: '#f44336', fontWeight: 'bold' },
  footer: { borderTopWidth: 1, borderColor: '#eee', paddingVertical: 20, alignItems: 'center' },
  totalText: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  confirmButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, width: '100%' },
  confirmText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 18, color: '#999' }
});

export default CartScreen;