import { Image } from "expo-image";
import { router } from "expo-router";
import styles from "./content.styles";
import { IPost } from "typings/post";
import { ResizeMode, Video } from "expo-av";
import { Play, Stack } from "phosphor-react-native";
import { TouchableOpacity, View } from "react-native";

interface ContentProps {
  item: IPost;
  contentIndex: number;
}

const Content = ({ item, contentIndex }: ContentProps) => {
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
          borderWidth: 0.5,
          borderColor: "#ddd",
          backgroundColor: "#f1f1f1",
          height: contentIndex % 2 == 0 ? 150 : 200,
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
          resizeMode={ResizeMode.COVER}
          source={{ uri: item?.media[0]?.url }}
        >
          <Image
            transition={300}
            contentFit="cover"
            style={[styles.mediaImage]}
            source={{ blurhash: "LIG+2d-;yDv{P;s+MvVrv0WF+FOt" }}
          />
        </Video>
      )}
    </TouchableOpacity>
  );
};

export default Content;
