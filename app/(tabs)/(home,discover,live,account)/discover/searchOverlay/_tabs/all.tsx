import Post from "components/shared/post";
import { StyleSheet, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

const AllResults = () => {
  return (
    <View style={[styles.creators_results]}>
      <Tabs.FlatList
        data={[1, 2, 3, 4, 5, 6]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <Post post={{}} />;
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
