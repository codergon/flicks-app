import Layout from "constants/Layout";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

const ImageView = () => {
  return (
    <View style={[styles.imgContainer]}>
      <Image
        style={[styles.mediaImage]}
        source={require("assets/images/mock/1.png")}
        placeholder={
          "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["
        }
        contentFit="cover"
        transition={300}
      />
    </View>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  imgContainer: {
    width: Layout.window.width,
    backgroundColor: "transparent",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
  },
});
