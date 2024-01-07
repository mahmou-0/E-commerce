// AccountDetailsScreen.js
import React, { useState, useLayoutEffect, useContext } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MyImage from "../assets/mah-01.png";
import axios from "axios";
import { UserType } from "../UserContext";

const AccountDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#00CED1",
      },
      headerLeft: () => (
        <View>
          <Text style={{ paddingTop: 10, fontSize: 20, fontWeight: "bold" }}>
            {" "}
            Acoount Information
          </Text>
          <Image
            style={{ width: 140, height: 120, resizeMode: "contain" }}
            //   source={{
            //     uri:
            //       "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
            //   }}
            // source={MyImage}
          />
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        ></View>
      ),
    });
  }, []);
  const { user } = route.params;
  // console.log(user);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState(user?.password); // Keep it empty for security
  // const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { userId, setUserId } = useContext(UserType);
  // console.log("usserId", userId);
  // console.log("Password", password);

  const handleUpdate = async () => {
    try {
      // Prepare the body of the request
      const body = {
        userId,
        name,
        email,
        oldPassword: password, // Current password for verification
        newPassword, // New password
      };

      // Make the API call
      const response = await fetch(
        `https://a85e-195-142-243-198.ngrok-free.app/update-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert("Failed to update user details", errorData.message);
        return;
      }

      const data = await response.json();
      Alert.alert("Success", "User details updated successfully.");
      console.log("User details updated:", data);
    } catch (error) {
      console.error("Error updating user details:", error);
      Alert.alert("Error", "An error occurred while updating user details.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Current Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="New Password"
        secureTextEntry
      />

      <Button title="Update Details" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
});

export default AccountDetailsScreen;
