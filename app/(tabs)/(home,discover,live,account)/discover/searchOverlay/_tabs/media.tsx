import Post from "components/shared/post";
import { FlatList, StyleSheet, View } from "react-native";

const MediaTab = () => {
  return (
    <View style={[styles.creators_results]}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <Post isPaid={!true} />;
        }}
        contentContainerStyle={{ paddingBottom: 16 }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default MediaTab;

const styles = StyleSheet.create({
  creators_results: {
    flex: 1,
    gap: 14,
    flexDirection: "column",
  },
});
