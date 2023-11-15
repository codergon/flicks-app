import { StyleSheet, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import ProfileWishItem from "components/profile/wishItem";

const ProfileWishlist = () => {
  const data = [
    {
      id: Math.random() * Math.random(),
    },
    {
      id: Math.random() * Math.random(),
    },
    {
      id: Math.random() * Math.random(),
    },
  ];

  return (
    <View style={[styles.wishlist]}>
      <Tabs.FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return <ProfileWishItem item={item} fulfilled={index % 2 === 1} />;
        }}
        contentContainerStyle={{
          gap: 14,
          paddingTop: 16,
          paddingBottom: 20,
          paddingHorizontal: 16,
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ProfileWishlist;

const styles = StyleSheet.create({
  wishlist: {
    flex: 1,
    flexDirection: "column",
  },
});
