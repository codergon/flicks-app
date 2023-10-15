import { Image } from "expo-image";
import styles from "./post.styles";
import { IPostMedia } from "typings/post";
import { ResizeMode, Video } from "expo-av";
import { Play } from "phosphor-react-native";
import { Blurhash } from "react-native-blurhash";
import { RgText } from "components/_ui/typography";
import { Fragment, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";

interface PostMediaProps {
  index: number;
  media: IPostMedia;
}

const PostMedia = ({ media, index }: PostMediaProps) => {
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<any>({});

  return (
    <View style={[styles.post_mediaItem]}>
      {media?.media_type === "image" ? (
        <Image
          transition={300}
          contentFit="cover"
          style={[styles.mediaImage]}
          source={{ uri: media?.url }}
          placeholder={media?.blur_hash || "LIG+2d-;yDv{P;s+MvVrv0WF+FOt"}
        />
      ) : (
        <Video
          isLooping
          ref={video}
          style={styles.mediaVideo}
          useNativeControls={false}
          source={{ uri: media?.url }}
          resizeMode={ResizeMode.COVER}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      )}

      {media?.media_type === "video" && video?.current && (
        <TouchableOpacity
          style={[styles.videoOverlay]}
          onPress={() =>
            status.isPlaying
              ? video?.current?.pauseAsync()
              : video?.current?.playAsync()
          }
        >
          {!status?.isPlaying && (
            <Fragment>
              <View style={[styles.playIcon]}>
                <Play size={20} color="#fff" weight="fill" />
              </View>

              <View
                style={[
                  styles.videoLength,
                  {
                    backgroundColor: "rgba(0,0,0,0.4)",
                  },
                ]}
              >
                <RgText
                  style={{
                    fontSize: 12,
                    color: "#fff",
                  }}
                >
                  {status?.durationMillis && (
                    <>
                      {Math.floor(status?.durationMillis / 1000 / 60) > 9
                        ? Math.floor(status?.durationMillis / 1000 / 60)
                        : `0${Math.floor(status?.durationMillis / 1000 / 60)}`}
                      :
                      {Math.floor(status?.durationMillis / 1000) > 9
                        ? Math.floor(status?.durationMillis / 1000)
                        : `0${Math.floor(status?.durationMillis / 1000)}`}
                    </>
                  )}
                </RgText>
              </View>
            </Fragment>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PostMedia;
