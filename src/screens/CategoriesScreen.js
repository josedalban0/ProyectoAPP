import React from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const categories = ["Calzado", "Indumentaria", "Accesorios"];

const CategoriesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.categoryItem} 
            onPress={() => navigation.navigate('Home', { category: item })}
          >
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  categoryItem: { backgroundColor: '#fff', padding: 25, marginBottom: 15, borderRadius: 10, elevation: 2 },
  text: { color: '#333', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }
});

export default CategoriesScreen;