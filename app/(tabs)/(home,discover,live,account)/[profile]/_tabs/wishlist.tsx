import ProfileWishItem from "components/profile/wishItem";
import { FlatList, StyleSheet, View } from "react-native";

const ProfileWishlist = () => {
  const data = [1, 2, 3];
  return (
    <View style={[styles.wishlist]}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return <ProfileWishItem item={item} />;
        }}
        contentContainerStyle={{ paddingVertical: 16, gap: 20 }}
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
