import React, { useState, useEffect } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native"; // Correct import for NavigationContainer
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LonginScreen"; // Corrected typo in LoginScreen import
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ProductinfoScreen from "../screens/ProductinfoScreen";
import AddAddressScreen from "../screens/AddAddressScreen";
import AddressScreen from "../screens/AddressScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";

import ConfirmationScreen from "../screens/ConfirmationScreen";
import OrderScreen from "../screens/OrderScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import { MaterialIcons } from "@expo/vector-icons";
import AdminPanel from "../screens/AdminPanel";
import AccountDetailsScreen from "../screens/AccountDetailsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductListScreen from "../component/ProductListScreen ";
import ProductDetailScreen from "../component/ProductDetailScreen ";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    // const [isAdmin, setIsAdmin] = useState(false);

    // useEffect(() => {
    //   const checkAdminStatus = async () => {
    //     const adminStatus = await AsyncStorage.getItem("isAdmin");
    //     setIsAdmin(JSON.parse(adminStatus));
    //   };

    //   checkAdminStatus();
    // }, []);

    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="home" size={24} color="#00CED1" />
              ) : (
                <Ionicons name="home" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: "Cart",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="shoppingcart" size={24} color="#00CED1" />
              ) : (
                <AntDesign name="shoppingcart" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Favorite"
          component={FavoriteScreen}
          options={{
            tabBarLabel: "Favorite",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialIcons name="favorite" size={24} color="#00CED1" />
              ) : (
                <MaterialIcons name="favorite-border" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "#008E97" },

            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={24} color="#00CED1" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              ),
          }}
        />

        {/* {isAdmin && (
          <Tab.Screen
            name="AdminMain"
            component={AdminLoginScreen}
            options={{
              tabBarLabel: "Admin Panel",
              tabBarLabelStyle: { color: "#008E97" },
              tabBarIcon: ({ focused }) => (
                <MaterialIcons
                  name="admin-panel-settings"
                  size={24}
                  color={focused ? "#00CED1" : "black"}
                />
              ),
            }}
          />
        )} */}
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <Stack.Navigator>
        {/* Corrected the screen name from "Longin" to "Login" */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Info"
          component={ProductinfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Address"
          component={AddAddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add"
          component={AddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Favortie"
          component={FavoriteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminMain"
          component={AdminPanel}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account"
          component={AccountDetailsScreen}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
          // options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default StackNavigator;
