import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  console.log("productsss-----", products);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `https://9cb5-195-142-243-198.ngrok-free.app/products`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert("Error", "Error fetching products");
    }
  };

  const deleteProduct = async (productId) => {
    console.log("productID-------------", productId);
    try {
      await axios.delete(
        `https://9cb5-195-142-243-198.ngrok-free.app/products/${productId}`
      );
      fetchProducts(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      Alert.alert("Error", "Error deleting product");
    }
  };

  return (
    <View style={styles.container}>
        
      <FlatList
        data={products}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text>{item.title}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetailScreen", {
                  productId: item._id,
                  refreshProducts: fetchProducts,
                })
              }
            >
              <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteProduct(item._id)}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button
        title="Add Product"
        onPress={() =>
          navigation.navigate("ProductDetailScreen", { productId: null })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  productItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
});

export default ProductListScreen;
