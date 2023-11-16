import { StyleSheet, View } from "react-native";
import { Text } from "components/_ui/typography";

interface NFTItemProps {
  data: {
    token_decimals: number;
    token_id: string;
    token_name: string;
  };
}

const NFTItem = ({ data }: NFTItemProps) => {
  return (
    <View style={[styles.container]}>
      <Text style={{ fontSize: 15 }}>
        {data?.token_name}
        <Text
          style={{ fontSize: 14, color: "#666" }}
        >{` (${data?.token_id})`}</Text>
      </Text>
    </View>
  );
};

export default NFTItem;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    flex: 1,
    minHeight: 28,
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
