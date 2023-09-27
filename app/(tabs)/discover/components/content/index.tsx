import { Image } from "expo-image";
import styles from "./content.styles";
import { View } from "react-native";
import { Play, Stack } from "phosphor-react-native";

const Content = () => {
  return (
    <View
      style={[
        styles.content,
        {
          // Math.min(200, Math.max(Math.floor(Math.random() * 250), 130)),
          height: Math.random() > 0.5 ? 130 : 200,
          backgroundColor: "#f1f1f1",
        },
      ]}
    >
      <View
        style={[
          styles.contentType_Icon,
          {
            backgroundColor: "rgba(0,0,0,0.02)",
          },
        ]}
      >
        {Math.random() > 0.8 ? (
          <Stack weight="fill" size={14} color="#fff" />
        ) : Math.random() > 0.6 ? (
          <Play weight="fill" size={14} color="#fff" />
        ) : null}
      </View>

      <Image
        transition={300}
        contentFit="cover"
        style={[styles.mediaImage]}
        source={require("assets/images/mock/1.png")}
      />
    </View>
  );
};

export default Content;
