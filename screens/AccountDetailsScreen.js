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
        <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          //   source={{
          //     uri:
          //       "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          //   }}
          source={MyImage}
        />
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
  console.log(user);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState(""); // Keep it empty for security
  // const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // const [confirmNewPassword, setConfirmNewPassword] = useState("");
  // //   const { userId, setUserId } = useContext(UserType);

  const handleUpdate = async () => {
    try {
      // Replace with your API endpoint and update logic
      const response = await fetch(
        `https://9cb5-195-142-243-198.ngrok-free.app/user/update-password${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password, // Current password for verification
            newPassword, // New password
          }),
        }
      );

      if (!response.ok) {
        Alert.alert("Failed to update user details");
      }

      const data = await response.json();
      console.log("User details updated:", data);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  // const handleUpdate = () => {
  //   const user = {
  //     name: name,
  //     email: email,
  //     password: password,
  //     newPassword: newPassword,
  //   };

  //   // send a post request  to the backend API
  //   axios
  //     .post("https://9cb5-195-142-243-198.ngrok-free.app/update-password", user)
  //     .then((response) => {
  //       console.log(response);
  //       Alert.alert(
  //         "Registration successful",
  //         "You have been registered Successfully"
  //       );
  //       setName("");
  //       setEmail("");
  //       setPassword("");
  //       setNewPassword("");
  //     })
  //     .catch((error) => {
  //       Alert.alert(
  //         "Registration Error",
  //         "An error occurred while registering"
  //       );
  //       console.log("registration failed....", error);
  //     });
  // };

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
