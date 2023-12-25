import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const AdminPanel = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>Admin Panel</Text>
      <Button
        title="Go to ProductList"
        onPress={() => navigation.navigate("ProductList")}
      />
      {/* <Button
        title="Go to ProductDetail"
        onPress={() => navigation.navigate("ProductDetailScreen")}
      /> */}
    </SafeAreaView>
  );
};

export default AdminPanel;

const styles = StyleSheet.create({});
