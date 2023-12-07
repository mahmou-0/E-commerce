import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { ModalPortal } from "react-native-modals";
import { UserContext } from "./UserContext";
// import { provider } from "react-redux";
// import { store } from "./store";

export default function App() {
  return (
    <>
      {/* <provider store={store}></provider> */}
      <UserContext>
        <StackNavigator />
        <ModalPortal />
      </UserContext>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
