import { Image } from "expo-image";
import { router } from "expo-router";
import styles from "./content.styles";
import { Play, Stack } from "phosphor-react-native";
import { TouchableOpacity, View } from "react-native";

interface ContentProps {
  item: any;
}

const Content = ({ item }: ContentProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        router.push({
          pathname: `/(tabs)/(discover)/discover/${item.id}`,
          params: { item: item },
        });
      }}
      style={[
        styles.content,
        {
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
    </TouchableOpacity>
  );
};

export default Content;
