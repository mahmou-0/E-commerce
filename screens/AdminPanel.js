import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const AdminPanel = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Admin Panel</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Product List"
          onPress={() => navigation.navigate("ProductList")}
          color="#007bff" // Example color
        />
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate("Main")}
          color="#28a745" // Example color
        />
        {/* Uncomment and style the button below as needed */}
        {/* <Button
          title="Go to Product Detail"
          onPress={() => navigation.navigate('ProductDetailScreen')}
          color="#17a2b8" // Example color
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default AdminPanel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa", // Example background color
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#343a40", // Example text color
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
