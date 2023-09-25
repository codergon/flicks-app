import { Image } from "expo-image";
import styles from "./post.styles";
import { ResizeMode, Video } from "expo-av";
import { Play } from "phosphor-react-native";
import { RgText } from "components/ui/typography";
import { Fragment, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";

interface PostMediaProps {
  item: any;
  index: number;
}

const PostMedia = ({ item, index }: PostMediaProps) => {
  const showVideo = index === 1;
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<any>({});

  return (
    <View
      style={[
        styles.post_mediaItem,
        {
          borderRightColor: "#ddd",
          borderRightWidth: !true ? 1 : 0,
        },
      ]}
    >
      {!showVideo ? (
        <Image
          style={[styles.mediaImage]}
          source={require("assets/images/mock/12.png")}
          placeholder={
            "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["
          }
          contentFit="cover"
          transition={300}
        />
      ) : (
        <Video
          ref={video}
          style={styles.mediaVideo}
          source={require("assets/videos/1.mp4")}
          useNativeControls={false}
          resizeMode={ResizeMode.COVER}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      )}

      {video?.current && showVideo && (
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
