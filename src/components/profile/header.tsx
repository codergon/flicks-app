import { Fragment } from "react";
import { router } from "expo-router";
import { TouchableOpacity, StyleSheet } from "react-native";
import { ArrowLeft, MoreHorizontal } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProfileHeaderBtns = () => {
  const inset = useSafeAreaInsets();

  return (
    <Fragment>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
        style={[
          styles.btn,
          {
            left: 16,
            top: 10 + inset.top,
          },
        ]}
      >
        <ArrowLeft size={18} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
        style={[
          styles.btn,
          {
            right: 16,
            top: 10 + inset.top,
          },
        ]}
      >
        <MoreHorizontal size={18} color="#fff" />
      </TouchableOpacity>
    </Fragment>
  );
};

export default ProfileHeaderBtns;

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
