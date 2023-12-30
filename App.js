// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, StatusBar } from "react-native";

import StackNavigator from "./navigation/StackNavigator";
import { ModalPortal } from "react-native-modals";
import { UserContext } from "./UserContext";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <UserContext>
          <StackNavigator>
            <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
          </StackNavigator>
          <ModalPortal />
        </UserContext>
      </Provider>
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
