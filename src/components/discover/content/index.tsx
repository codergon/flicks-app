import { Image } from "expo-image";
import { router } from "expo-router";
import styles from "./content.styles";
import { Play, Stack } from "phosphor-react-native";
import { TouchableOpacity, View } from "react-native";
import { IPost } from "typings/post";
import { ResizeMode, Video } from "expo-av";

interface ContentProps {
  item: IPost;
}

const Content = ({ item }: ContentProps) => {
  const imageMedia = item?.media?.find(
    (media) => media?.media_type === "image"
  );

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        router.push({
          pathname: `/(tabs)/(discover)/discover/content`,
          params: { postId: item.id, post: JSON.stringify(item) },
        });
      }}
      style={[
        styles.content,
        {
          backgroundColor: "#f1f1f1",
          // height: Math.random() > 0.5 ? 130 : 200,
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
        {item?.media?.length > 1 ? (
          <Stack weight="fill" size={14} color="#fff" />
        ) : item?.media?.[0]?.media_type === "video" ? (
          <Play weight="fill" size={14} color="#fff" />
        ) : null}
      </View>

      {imageMedia ? (
        <Image
          transition={300}
          contentFit="cover"
          style={[styles.mediaImage]}
          source={{ uri: imageMedia?.url }}
          placeholder={"LIG+2d-;yDv{P;s+MvVrv0WF+FOt"}
        />
      ) : (
        <Video
          shouldPlay={false}
          style={styles.mediaImage}
          useNativeControls={false}
          source={{ uri: item?.media[0]?.url }}
          resizeMode={ResizeMode.COVER}
        />
      )}
    </TouchableOpacity>
  );
};

export default Content;
