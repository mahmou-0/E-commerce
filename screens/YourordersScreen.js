import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const YourordersScreen = () => {
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
            Your Orders
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

  const { userId, setUserId } = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://9cb5-195-142-243-198.ngrok-free.app/orders/${userId}`
        );
        const orders = response.data.orders;
        setOrders(orders);

        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchOrders();
  }, []);

  //   const navigateToProductInfo = (item) => {
  //     navigation.navigate("Info", {
  //       id: item.id,
  //       title: item?.title,
  //       price: item?.price,
  //       carouselImages: item.carouselImages,
  //       color: item?.color,
  //       size: item?.size,
  //       oldPrice: item?.oldPrice,
  //       item: item,
  //     });
  //   };

  //   const dispatch = useDispatch();
  //   const renderItem = ({ item }) => {
  //     return (
  //       <TouchableOpacity
  //         onPress={() => navigateToProductInfo(item)}
  //         style={{ flexDirection: "row", padding: 10, alignItems: "center" }}
  //       >
  //         <Image
  //           source={{ uri: item?.image }}
  //           style={{ width: 100, height: 140, marginRight: 10 }}
  //         />
  //         <View style={{ flex: 1 }}>
  //           <Text style={{ fontSize: 18, fontWeight: "bold" }}>
  //             {item.title}
  //           </Text>
  //         </View>
  //       </TouchableOpacity>
  //     );
  //   };

  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        {loading ? (
          <Text>Loading...</Text>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Pressable
              style={{
                marginTop: 20,
                padding: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#d0d0d0",
                marginHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Info")}
              key={order._id}
            >
              {/* Render the order information here */}
              {order.products.slice(0, 1)?.map((product) => (
                <View style={{ marginVertical: 10 }} key={product._id}>
                  <Image
                    source={{ uri: product.image }}
                    style={{ width: 100, height: 100, resizeMode: "contain" }}
                  />
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default YourordersScreen;

const styles = StyleSheet.create({});
