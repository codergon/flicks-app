import { StyleSheet, View } from "react-native";
import Post from "../../../home/components/post";

const MediaTab = () => {
  return (
    <View style={[styles.creators_results]}>
      {[1, 2, 3]?.map((i, ind) => {
        return <Post isPaid={!true} containsMedia={!false} key={ind} />;
      })}
    </View>
  );
};

export default MediaTab;

const styles = StyleSheet.create({
  creators_results: {
    flex: 1,
    gap: 14,
    paddingVertical: 16,
    flexDirection: "column",
  },
});
