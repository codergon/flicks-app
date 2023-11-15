import Layout from "constants/layout";
import { StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AppStatusBar = ({ backgroundColor = "transparent", ...props }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        top: 0,
        left: 0,
        zIndex: 999,
        backgroundColor,
        height: insets.top,
        position: "absolute",
        width: Layout.window.width,
      }}
    >
      <StatusBar
        {...props}
        translucent
        animated={true}
        backgroundColor={backgroundColor}
      />
    </View>
  );
};

export default AppStatusBar;
