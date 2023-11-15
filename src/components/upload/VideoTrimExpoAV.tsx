import { Image } from "expo-image";
import Layout from "constants/layout";
import { useRef, useState } from "react";
import { padding } from "helpers/styles";
import triggerAudio from "utils/playSound";
import { Video, ResizeMode } from "expo-av";
import { Play } from "phosphor-react-native";
import { MediaType } from "providers/AppProvider";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import RNFS from "react-native-fs";
import {
  FFmpegKit,
  ReturnCode,
  FFmpegKitConfig,
} from "ffmpeg-kit-react-native";
import FFmpegWrapper from "lib/FFmpeg";
import { Text } from "components/_ui/typography";
// import ImagePicker from "react-native-image-crop-picker";
// import Video from "react-native-video";

const SCREEN_WIDTH = Layout.window.width;
const SCREEN_HEIGHT = Layout.window.height;

export const FRAME_PER_SEC = 1;
export const FRAME_WIDTH = 80;
const TILE_HEIGHT = 60;
const TILE_WIDTH = FRAME_WIDTH / 1.5; // to get a 2x resolution

const DURATION_WINDOW_DURATION = 4;
const DURATION_WINDOW_BORDER_WIDTH = 4;
const DURATION_WINDOW_WIDTH =
  DURATION_WINDOW_DURATION * FRAME_PER_SEC * TILE_WIDTH;
const POPLINE_POSITION = "50%";

const getFileNameFromPath = (path: string) => {
  const fragments = path.split("/");
  let fileName = fragments[fragments.length - 1];
  fileName = fileName.split(".")[0];
  return fileName;
};

const FRAME_STATUS = Object.freeze({
  LOADING: { name: Symbol("LOADING") },
  READY: { name: Symbol("READY") },
});

const VideoMedia = ({ media }: { media: MediaType }) => {
  const video = useRef<Video>(null);
  // const [status, setStatus] = useState<any>({});

  const [frames, setFrames] = useState<any>(); // <[{status: <FRAME_STATUS>}]>

  const [selectedVideo, setSelectedVideo] = useState<any>({
    creationDate: 1630546800,
    duration: 5951.666666666667,
    // fileName: "pexels-anna-bondarenko-5757789 (2160p).mp4",
    localFileName: "90D77165-DEFD-4D6D-81D2-99B0E3610F4C",
    uri: "file:///var/mobile/Containers/Data/Application/77BE25B1-0356-4DF9-BF10-1FEB8A6EEFB7/Library/Caches/ImagePicker/90D77165-DEFD-4D6D-81D2-99B0E3610F4C.mp4",
  });

  // scrubbing
  const [framesLineOffset, setFramesLineOffset] = useState(0);

  const [paused, setPaused] = useState(false);

  const handleOnTouchEnd = () => {
    setPaused(false);
  };
  const handleOnTouchStart = () => {
    setPaused(true);
  };

  const getLeftLinePlayTime = (offset: number) => {
    return offset / (FRAME_PER_SEC * TILE_WIDTH);
  };
  const getRightLinePlayTime = (offset: number) => {
    return (offset + DURATION_WINDOW_WIDTH) / (FRAME_PER_SEC * TILE_WIDTH);
  };

  const handleOnProgress = async ({ currentTime }: any) => {
    if (currentTime >= getRightLinePlayTime(framesLineOffset)) {
      // video.current.seek(getLeftLinePlayTime(framesLineOffset));

      await video.current?.setPositionAsync(
        getLeftLinePlayTime(framesLineOffset) * 1000
      );
    }
  };

  const getPopLinePlayTime = (offset: number) => {
    return (
      (offset + (DURATION_WINDOW_WIDTH * parseFloat(POPLINE_POSITION)) / 100) /
      (FRAME_PER_SEC * TILE_WIDTH)
    );
  };

  const handleOnScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const playbackTime = getPopLinePlayTime(nativeEvent.contentOffset.x);
    // video.current?.seek(playbackTime);
    video.current?.setPositionAsync(playbackTime * 1000);
    setFramesLineOffset(nativeEvent.contentOffset.x);
  };

  //
  const handleVideoLoad = (videoAssetLoaded: any) => {
    const numberOfFrames = Math.ceil(selectedVideo.duration / 500); // should be 1000
    // const numberOfFrames = 50;

    setFrames(
      Array(numberOfFrames).fill({
        status: FRAME_STATUS.LOADING.name.description,
      })
    );

    FFmpegWrapper.getFrames(
      selectedVideo.localFileName,
      selectedVideo.uri,
      numberOfFrames,
      (filePath) => {
        const _frames = [];
        for (let i = 0; i < numberOfFrames; i++) {
          _frames.push(
            // @ts-ignore
            `${filePath.replace("%4d", String(i + 1).padStart(4, 0))}.png`
          );
        }
        setFrames(_frames);
      }
    );
  };

  const renderFrame = (frame: any, index: number) => {
    if (frame.status === FRAME_STATUS.LOADING.name.description) {
      return (
        <View
          style={{
            width: TILE_WIDTH,
            height: TILE_HEIGHT,
            backgroundColor: "rgba(0,0,0,0.05)",
            borderColor: "rgba(0,0,0,0.1)",
            borderWidth: 1,
          }}
          key={index}
        ></View>
      );
    } else {
      return (
        <Image
          key={index}
          source={{
            uri: "file://" + frame.substr(0, frame.length - 4),
          }}
          style={{
            width: TILE_WIDTH,
            height: TILE_HEIGHT,
          }}
        />
      );
    }
  };

  return (
    <View style={[styles.mediaContainer]}>
      <View style={{ flex: 1, width: "100%" }}>
        <Video
          isLooping
          ref={video}
          useNativeControls={false}
          style={styles.mediaVideo}
          source={{ uri: selectedVideo.uri }}
          resizeMode={ResizeMode.COVER}
          onLoad={handleVideoLoad}
          onPlaybackStatusUpdate={(status: any) => {
            handleOnProgress(status?.playableDurationMillis / 1000);
            // setStatus(() => status);
          }}
        >
          <Image
            transition={300}
            contentFit="cover"
            style={[
              {
                width: "100%",
                height: "100%",
              },
            ]}
            source={{ blurhash: "LIG+2d-;yDv{P;s+MvVrv0WF+FOt" }}
          />
        </Video>
      </View>

      {frames && (
        <>
          <View style={styles.durationWindowAndFramesLineContainer}>
            <View style={styles.durationWindow}>
              <View style={styles.durationLabelContainer}>
                <Text style={styles.durationLabel}>
                  {DURATION_WINDOW_DURATION} sec.
                </Text>
              </View>
            </View>
            <View style={styles.popLineContainer}>
              <View style={styles.popLine} />
            </View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.framesLine}
              alwaysBounceHorizontal={true}
              scrollEventThrottle={1}
              onScroll={handleOnScroll}
              onTouchStart={handleOnTouchStart}
              onTouchEnd={handleOnTouchEnd}
              onMomentumScrollEnd={handleOnTouchEnd}
            >
              <View style={styles.prependFrame} />
              {frames.map((frame: any, index: number) =>
                renderFrame(frame, index)
              )}
              <View style={styles.appendFrame} />
            </ScrollView>
          </View>
        </>
      )}

      {/* {video?.current && (
        <TouchableOpacity
          style={[styles.videoOverlay]}
          onPress={() =>
            status.isPlaying
              ? video?.current?.pauseAsync()
              : triggerAudio(video)
          }
        >
          {!status?.isPlaying && (
            <View style={[styles.playIcon]}>
              <Play size={28} color="#fff" weight="fill" />
            </View>
          )}
        </TouchableOpacity>
      )} */}
    </View>
  );
};

export default VideoMedia;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  buttonText: {
    color: "#fff",
  },
  videoContainer: {
    width: SCREEN_WIDTH,
    height: 0.6 * SCREEN_HEIGHT,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    height: "100%",
    width: "100%",
  },
  framesLine: {
    width: SCREEN_WIDTH,
  },
  loadingFrame: {
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
  },

  durationWindowAndFramesLineContainer: {
    marginTop: 56,

    top: -DURATION_WINDOW_BORDER_WIDTH,
    height: TILE_HEIGHT + DURATION_WINDOW_BORDER_WIDTH * 2,
    justifyContent: "center",
  },
  durationWindow: {
    top: -DURATION_WINDOW_BORDER_WIDTH,
    width: DURATION_WINDOW_WIDTH,
    borderColor: "yellow",
    borderWidth: DURATION_WINDOW_BORDER_WIDTH,
    borderRadius: 4,
    height: TILE_HEIGHT + DURATION_WINDOW_BORDER_WIDTH * 2,
    alignSelf: "center",
    zIndex: 25,

    pointerEvents: "none",

    position: "absolute",
  },
  durationLabelContainer: {
    backgroundColor: "yellow",
    alignSelf: "center",
    top: -26,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  durationLabel: {
    color: "rgba(0,0,0,0.6)",
    fontWeight: "700",
  },
  popLineContainer: {
    position: "absolute",
    alignSelf: POPLINE_POSITION === "50%" ? "center" : "auto", // otherwise raise Error("Not implemented"),
    zIndex: 25,
  },
  popLine: {
    width: 3,
    height: TILE_HEIGHT,
    backgroundColor: "yellow",
  },

  prependFrame: {
    width: SCREEN_WIDTH / 2 - DURATION_WINDOW_WIDTH / 2,
  },
  appendFrame: {
    width: SCREEN_WIDTH / 2 - DURATION_WINDOW_WIDTH / 2,
  },

  //

  mediaContainer: {
    flex: 1,
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
