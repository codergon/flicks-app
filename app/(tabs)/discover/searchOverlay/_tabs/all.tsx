import Post from "../../../home/components/post";
import { FlatList, StyleSheet, View } from "react-native";

const AllResults = () => {
  return (
    <View style={[styles.creators_results]}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <Post isPaid={!true} containsMedia={item % 3 == 0} />;
        }}
        contentContainerStyle={{ paddingBottom: 16 }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default AllResults;

const styles = StyleSheet.create({
  creators_results: {
    flex: 1,
    gap: 14,
    flexDirection: "column",
  },
});
