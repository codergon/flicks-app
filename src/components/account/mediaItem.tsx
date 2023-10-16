import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Play, Stack } from "phosphor-react-native";
import { TouchableOpacity, View } from "react-native";

interface ContentProps {
  item: any;
}

const AccountMediaItem = ({ item }: ContentProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        // router.push({
        //   pathname: `/(tabs)/(discover)/discover/${item.id}`,
        //   params: { item: item },
        // });
      }}
      style={[
        styles.content,
        {
          height: 150,
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
        {Math.random() > 0.6 ? (
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

export default AccountMediaItem;

const styles = StyleSheet.create({
  content: {
    flex: 1 / 3,
    margin: 3,
    height: 180,
    borderRadius: 8,
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "flex-end",
  },

  contentType_Icon: {
    top: 4,
    right: 4,
    zIndex: 3,
    padding: 2,
    borderRadius: 20,
    position: "absolute",
  },

  mediaImage: {
    width: "100%",
    height: "100%",
  },
});
