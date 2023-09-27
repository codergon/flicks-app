import { StyleSheet, View } from "react-native";
import Post from "../../../home/components/post";

const AllResults = () => {
  return (
    <View style={[styles.creators_results]}>
      {[1, 2, 3, 4, 5, 6]?.map((i, ind) => {
        return <Post isPaid={!true} containsMedia={ind % 3 == 0} key={ind} />;
      })}
    </View>
  );
};

export default AllResults;

const styles = StyleSheet.create({
  creators_results: {
    flex: 1,
    gap: 14,
    paddingVertical: 16,
    flexDirection: "column",
  },
});
