import { Image } from "expo-image";
import { padding } from "helpers/styles";
import { RgText, Text } from "components/_ui/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, StyleSheet, TouchableHighlight } from "react-native";

const PostComment = () => {
  return (
    <View style={[styles.comment]}>
      <TouchableHighlight
        style={[
          styles.comment_userImage,
          {
            backgroundColor: "rgba(0,0,0,0.07)",
          },
        ]}
      >
        <Image
          transition={300}
          contentFit="cover"
          style={[styles.comment_userImage_img]}
          source={require("assets/images/mock/5.png")}
        />
      </TouchableHighlight>

      <View
        style={[
          {
            gap: 4,
            flex: 1,
          },
        ]}
      >
        <View
          style={{
            gap: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              {
                fontSize: 13,
                color: "#000",
                letterSpacing: 0.26,
              },
            ]}
          >
            Rissa
          </Text>
          <RgText
            style={[
              {
                fontSize: 12.4,
                color: "#666",
              },
            ]}
          >
            2hrs ago
          </RgText>
        </View>

        <RgText
          style={[
            {
              fontSize: 14,
              color: "#444",
            },
          ]}
        >
          This art feels like a dream. I love it 👏
        </RgText>
      </View>
    </View>
  );
};

export default PostComment;

const styles = StyleSheet.create({
  comment: {
    gap: 12,
    width: "100%",
    ...padding(10, 16),
    flexDirection: "row",
  },
  comment_userImage: {
    width: 34,
    height: 34,
    borderRadius: 46,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  comment_userImage_img: {
    width: "100%",
    height: "100%",
  },
});
