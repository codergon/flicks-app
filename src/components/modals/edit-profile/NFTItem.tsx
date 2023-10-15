import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Text } from "components/_ui/typography";
import nftCollections from "constants/nftCollections";

interface NFTItemProps {
  data: (typeof nftCollections)[0];
}

const NFTItem = ({ data }: NFTItemProps) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.nftImage]}>
        <Image
          transition={300}
          contentFit="cover"
          style={[styles.image]}
          source={{ uri: data?.image }}
        />
      </View>
      <Text style={{ fontSize: 15 }}>{data?.name}</Text>
    </View>
  );
};

export default NFTItem;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },

  nftImage: {
    width: 28,
    height: 28,
    borderRadius: 40,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
