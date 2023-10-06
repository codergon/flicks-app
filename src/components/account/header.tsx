import { Fragment } from "react";
import { router } from "expo-router";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, MoreHorizontal, Pencil, X } from "lucide-react-native";
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
          },
        ]}
      >
        {/* <MoreHorizontal size={18} color="#fff" /> */}
        {/* <Pencil size={14} color="#fff" /> */}
        <Gear size={17} color="#fff" weight="regular" />
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
    backgroundColor: "#14141460",
  },
});
