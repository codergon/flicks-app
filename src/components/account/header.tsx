import { Fragment } from "react";
import { router } from "expo-router";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  MoreHorizontal,
  Pencil,
  Share,
  X,
} from "lucide-react-native";
import { Gear } from "phosphor-react-native";

const AccountHeaderBtns = () => {
  const inset = useSafeAreaInsets();

  return (
    <Fragment>
      <TouchableOpacity
        onPress={() => {}}
        style={[
          styles.btn,
          {
            right: 16,
            top: 10 + inset.top,
            backgroundColor: "#141414c0",
          },
        ]}
      >
        {/* <MoreHorizontal size={18} color="#fff" /> */}
        {/* <Pencil size={14} color="#fff" /> */}
        <Share size={17} color="#fff" strokeWidth={2.1} />
      </TouchableOpacity>
    </Fragment>
  );
};

export default AccountHeaderBtns;

const styles = StyleSheet.create({
  btn: {
    width: 30,
    height: 30,
    zIndex: 99,
    borderRadius: 30,
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
  },
});
