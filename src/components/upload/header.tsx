import { Fragment } from "react";
import { router } from "expo-router";
import { X } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "components/_ui/typography";

const UploadHeaderBtns = () => {
  return (
    <Fragment>
      <TouchableOpacity
        onPress={() => {
          router.canGoBack()
            ? router.back()
            : router.replace("/(tabs)/(home)/home");
        }}
        style={[
          {
            top: 10,
            left: 10,
            width: 36,
            height: 36,
            zIndex: 99,
            borderRadius: 30,
            alignItems: "center",
            position: "absolute",
            justifyContent: "center",
            backgroundColor: "#14141460",
          },
        ]}
      >
        <X size={22} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push("/upload/details");
        }}
        style={[
          {
            top: 10,
            right: 10,
            height: 34,
            zIndex: 99,
            borderRadius: 30,
            position: "absolute",
            alignItems: "center",
            paddingHorizontal: 16,
            backgroundColor: "#fff",
            justifyContent: "center",

            shadowRadius: 3,
            shadowOpacity: 0.2,
            shadowColor: "#111",
            shadowOffset: { width: -2, height: 2 },
          },
        ]}
      >
        <Text
          style={{
            color: "#000",
            letterSpacing: 0.2,
          }}
        >
          Next
        </Text>
      </TouchableOpacity>
    </Fragment>
  );
};

export default UploadHeaderBtns;
