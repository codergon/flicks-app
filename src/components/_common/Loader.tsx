import AppLogo from "./AppLogo";
import { View } from "../_ui/themed";
import { StatusBar } from "react-native";

const Loader = () => {
  return (
    <View
      transparent={false}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#080808",
      }}
    >
      <StatusBar barStyle="default" />

      <AppLogo />
    </View>
  );
};

export default Loader;
