import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { removeFavorite } from "../redux/FavoriteReducer"; // Adjust the path as per your project structure

const FavoriteScreen = () => {
  const navigation = useNavigation();
  const favorites = useSelector((state) => state.favorites.favorites);
  const Separator = () => {
    return (
      <View style={{ height: 1, backgroundColor: "#e0e0e0", marginLeft: 10 }} />
    );
  };

  const navigateToProductInfo = (item) => {
    navigation.navigate("Info", {
      id: item.id,
      title: item.title,
      price: item?.price,
      carouselImages: item.carouselImages,
      color: item?.color,
      size: item?.size,
      oldPrice: item?.oldPrice,
      item: item,
    });
  };

  const dispatch = useDispatch();
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigateToProductInfo(item)}
        style={{ flexDirection: "row", padding: 10, alignItems: "center" }}
      >
        <Image
          source={{ uri: item?.image }}
          style={{ width: 100, height: 140, marginRight: 10 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView>
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
            <TextInput placeholder="Sreach Turquoise.in" />
          </Pressable>

          <Feather name="mic" size={24} color="black" />
        </View>
      </SafeAreaView>

      <View style={{ flex: 1 }}>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: "#e0e0e0" }} />
          )}
        />
      </View>
    </>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({});
