import { Image } from "expo-image";
import Layout from "constants/Layout";
import { useRef, useState } from "react";
import { padding } from "helpers/styles";
import { ResizeMode, Video } from "expo-av";
import { Play } from "phosphor-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface MediaItemViewProps {
  media: any;
}

const MediaItemView = ({ media }: MediaItemViewProps) => {
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<any>({});

  return (
    <View style={[styles.mediaContainer]}>
      {media?.media_type === "image" ? (
        <Image
          contentFit="contain"
          style={[styles.mediaImage]}
          source={{ uri: media?.url }}
        />
      ) : (
        <>
          <Video
            ref={video}
            isLooping={false}
            useNativeControls={false}
            style={styles.mediaVideo}
            source={{ uri: media?.url }}
            resizeMode={ResizeMode.COVER}
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />

          {video?.current && (
            <TouchableOpacity
              style={[styles.videoOverlay]}
              onPress={() =>
                status.isPlaying
                  ? video?.current?.pauseAsync()
                  : video?.current?.playAsync()
              }
            >
              {!status?.isPlaying && (
                <View style={[styles.playIcon]}>
                  <Play size={28} color="#fff" weight="fill" />
                </View>
              )}
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default MediaItemView;

const styles = StyleSheet.create({
  mediaContainer: {
    position: "relative",
    width: Layout.window.width,
    backgroundColor: "transparent",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
  },
  mediaVideo: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },

  // Video Overlay
  videoOverlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "transparent",
  },
  playIcon: {
    width: 60,
    height: 60,
    top: "50%",
    left: "50%",
    borderRadius: 30,
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    transform: "translate(-16px, -16px)",
  },
  videoLength: {
    left: 10,
    zIndex: 3,
    bottom: 10,
    borderRadius: 20,
    ...padding(4, 12),
    position: "absolute",
    backgroundColor: "#000",
  },
});
