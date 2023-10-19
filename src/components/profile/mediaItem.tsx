import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Play, Stack } from "phosphor-react-native";
import { TouchableOpacity, View } from "react-native";
import { ResizeMode, Video } from "expo-av";

interface ContentProps {
  item: any;
}

const ProfileMediaItem = ({ item }: ContentProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        router.push({
          pathname: `/mediaView/`,
          params: { media_type: item?.media_type, url: item?.url },
        });
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
        {item?.media_type === "video" ? (
          <Play weight="fill" size={14} color="#fff" />
        ) : null}
      </View>

      {item?.media_type === "image" ? (
        <Image
          transition={300}
          contentFit="cover"
          style={[styles.mediaImage]}
          source={{ uri: item?.url }}
          placeholder={"LIG+2d-;yDv{P;s+MvVrv0WF+FOt"}
        />
      ) : (
        <Video
          shouldPlay={false}
          style={styles.mediaImage}
          useNativeControls={false}
          source={{ uri: item?.url }}
          resizeMode={ResizeMode.COVER}
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

export default ProfileMediaItem;

const styles = StyleSheet.create({
  content: {
    // flex: 1 / 3,
    marginHorizontal: 3,
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
