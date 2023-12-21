// AccountDetailsScreen.js
import React, { useState, useLayoutEffect, useContext } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
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

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(""); // Keep it empty for security
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
//   const { userId, setUserId } = useContext(UserType);

  const handleUpdate = async () => {
    try {
      // Replace with your API endpoint and update logic
      const response = await axios.put(
        `https://96c7-82-222-61-37.ngrok-free.app/update-password/${user.id}`,
        {
          name,
          email,
          // For password, consider having a separate endpoint for security
        }
      );
      // Handle response
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.error(error);
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
        placeholder="Password"
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
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
});

export default AccountDetailsScreen;
