import { Image } from "expo-image";
import Layout from "constants/layout";
import { StyleSheet, View } from "react-native";
import { MediaType } from "providers/AppProvider";

interface ImageMediaProps {
  media: MediaType;
}

const ImageMedia = ({ media }: ImageMediaProps) => {
  return (
    <View style={[styles.mediaContainer]}>
      <Image
        contentFit="contain"
        style={[styles.mediaImage]}
        source={{ uri: media.uri }}
        placeholder={"LIG+2d-;yDv{P;s+MvVrv0WF+FOt"}
      />
    </View>
  );
};

export default ImageMedia;

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
});
