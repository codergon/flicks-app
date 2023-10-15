import { Image } from "expo-image";
import { padding } from "helpers/styles";
import { IPostComment } from "typings/post";
import TimeAgo from "components/_common/TimeAgo";
import { RgText, Text } from "components/_ui/typography";
import { View, StyleSheet, TouchableHighlight } from "react-native";

interface PostCommentProps {
  comment: IPostComment;
}

const PostComment = ({ comment }: PostCommentProps) => {
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
          source={{ uri: comment?.author?.image_url }}
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
            {comment?.author?.moniker}
          </Text>
          {comment?.created_at && (
            <TimeAgo
              date={Date.parse(comment?.created_at)}
              textStyle={{
                fontSize: 11,
                lineHeight: 11,
                color: "#676C75",
              }}
            />
          )}
        </View>

        <RgText
          style={[
            {
              fontSize: 14,
              color: "#444",
            },
          ]}
        >
          {comment?.message}
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
