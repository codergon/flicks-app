import Post from "components/shared/post";
import { FlatList, StyleSheet, View } from "react-native";

const ProfilieUpcomingStreams = () => {
  const data = [1, 2, 3, 4, 5, 6];
  return (
    <View style={[styles.upcoming]}>
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

export default ProfilieUpcomingStreams;

const styles = StyleSheet.create({
  upcoming: {
    flex: 1,
    gap: 14,
    flexDirection: "column",
  },
});
