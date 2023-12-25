import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

const ProductDetailScreen = ({ route, navigation }) => {
  const [product, setProduct] = useState({
    title: "",
    offer: "",
    oldPrice: "",
    price: "",
    image: "",
    color: "",
    size: "",
  });
  //   console.log("productsssss--------s-s", product);
  const productId = route.params?.productId ?? null;
  const refreshProducts = route.params?.refreshProducts ?? (() => {});

  //   console.log("productid--------id", route.params);

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(
        `https://9cb5-195-142-243-198.ngrok-free.app/products/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      Alert.alert("Error", "Error fetching product details");
    }
  };

  const handleSave = async () => {
    try {
      if (productId) {
        await axios.put(
          `https://9cb5-195-142-243-198.ngrok-free.app/products/${productId}`,
          product
        );
      } else {
        await axios.post(
          "https://9cb5-195-142-243-198.ngrok-free.app/products",
          product
        );
      }
      refreshProducts();
      navigation.goBack();
    } catch (error) {
      console.error("Error saving product:", error);
      Alert.alert("Error", "Error saving product");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={product.title}
        onChangeText={(text) => setProduct({ ...product, title: text })}
        placeholder="Title"
      />
      <TextInput
        style={styles.input}
        value={String(product.quantity)}
        onChangeText={(text) => setProduct({ ...product, quantity: text })}
        placeholder="quantity"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={product.offer}
        onChangeText={(text) => setProduct({ ...product, offer: text })}
        placeholder="Offer"
      />
      <TextInput
        style={styles.input}
        value={String(product.oldPrice)}
        onChangeText={(text) => setProduct({ ...product, oldPrice: text })}
        placeholder="Old Price"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={String(product.price)}
        onChangeText={(text) => setProduct({ ...product, price: text })}
        placeholder="Price"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={String(product.image)}
        onChangeText={(text) => setProduct({ ...product, image: text })}
        placeholder="Image"
        // keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={String(product.color)}
        onChangeText={(text) => setProduct({ ...product, color: text })}
        placeholder="Color"
        // keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={String(product.size)}
        onChangeText={(text) => setProduct({ ...product, size: text })}
        placeholder="Size"
        // keyboardType="numeric"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default ProductDetailScreen;
