import { Fragment } from "react";
import { router, useSegments } from "expo-router";
import { TouchableOpacity, StyleSheet } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProfileHeaderBtns = () => {
  const inset = useSafeAreaInsets();
  const [_, segment] = useSegments();

  return (
    <Fragment>
      <TouchableOpacity
        onPress={() => {
          router.canGoBack()
            ? router.back()
            : router.replace(
                `/(tabs)/${segment}/${segment.substring(
                  1,
                  segment.length - 1
                )}` as any
              );
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
