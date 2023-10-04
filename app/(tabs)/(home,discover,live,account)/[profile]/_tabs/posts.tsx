import Post from "components/shared/post";
import { FlatList, StyleSheet, View } from "react-native";

const PostsTab = () => {
  const data = [1, 2, 3, 4, 5, 6];
  return (
    <View style={[styles.posts]}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <Post
              isPaid={!true}
              containsMedia={item % 2 == 0}
              showBorder={index !== data?.length - 1}
            />
          );
        }}
        contentContainerStyle={{ paddingBottom: 16 }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default PostsTab;

const styles = StyleSheet.create({
  posts: {
    flex: 1,
    gap: 14,
    flexDirection: "column",
  },
});
