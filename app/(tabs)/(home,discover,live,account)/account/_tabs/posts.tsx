import Post from "components/shared/post";
import { StyleSheet } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

const AccountPostsTab = () => {
  const data = [1, 2, 3, 4, 5, 6];
  return (
    <Tabs.FlatList
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
  );
};

export default AccountPostsTab;

const styles = StyleSheet.create({});
