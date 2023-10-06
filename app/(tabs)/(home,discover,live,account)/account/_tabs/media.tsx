import Post from "components/shared/post";
import { FlatList, StyleSheet, View } from "react-native";

const AccountMediaTab = () => {
  return (
    <View style={[styles.media_tab]}>
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

export default AccountMediaTab;

const styles = StyleSheet.create({
  media_tab: {
    flex: 1,
    gap: 14,
    flexDirection: "column",
  },
});
