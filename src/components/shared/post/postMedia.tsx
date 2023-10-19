import { Image } from "expo-image";
import styles from "./post.styles";
import { IPostMedia } from "typings/post";
import { Video, ResizeMode } from "expo-av";
import triggerAudio from "utils/playSound";
import { Play } from "phosphor-react-native";
import { RgText } from "components/_ui/typography";
import { Fragment, useRef, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";

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
          volume={1}
          style={styles.mediaVideo}
          useNativeControls={false}
          source={{ uri: media?.url }}
          resizeMode={ResizeMode.COVER}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        >
          <Image
            transition={300}
            contentFit="cover"
            style={[styles.mediaImage]}
            source={{ blurhash: "LIG+2d-;yDv{P;s+MvVrv0WF+FOt" }}
          />
        </Video>
      )}

      {media?.media_type === "video" && video?.current && status.isLoaded && (
        <TouchableOpacity
          style={[styles.videoOverlay]}
          onPress={() =>
            status.isPlaying
              ? video?.current?.pauseAsync()
              : triggerAudio(video)
          }
        >
          {!status?.isPlaying ? (
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
          ) : (
            <>
              {status?.isBuffering && (
                <View style={[styles.playIcon]}>
                  <ActivityIndicator size="small" color="#fff" />
                </View>
              )}
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PostMedia;
