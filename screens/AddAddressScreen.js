import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React from "react";
// import React, { useEffect, useContext, useState, useCallback } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
// import { Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import { UserType } from "../UserContext";

const AddAddressScreen = () => {
  const navigation = useNavigation();

  // const [addresses, setAddresses] = useState([]);
  // const { userId, setUserId } = useContext(UserType);
  // console.log("userId", userId);
  // useEffect(() => {
  //   fetchAddresses();
  // }, []);
  // const fetchAddresses = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8000/addresses/${userId}`
  //     );
  //     const { addresses } = response.data;

  //     setAddresses(addresses);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  // //refresh the addresses when the component comes to the focus ie basically when we navigate back
  // useFocusEffect(
  //   useCallback(() => {
  //     fetchAddresses();
  //   }, [])
  // );
  // console.log("addresses", addresses);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
      <View
        style={{
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={24}
            color="black"
          />
          <TextInput placeholder="Sreach Amazon.in" />
        </Pressable>

        <Feather name="mic" size={24} color="black" />
      </View>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Addresses</Text>

        <Pressable
          onPress={() => navigation.navigate("Add")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
          }}
        >
          <Text>Add a new Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <Pressable>{/* all the added adresses */}</Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});