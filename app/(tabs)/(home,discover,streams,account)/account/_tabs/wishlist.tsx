import { useRef } from "react";
import { ListPlus } from "phosphor-react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Tabs } from "react-native-collapsible-tab-view";
import AccountWishItem from "components/account/wishItem";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const AccountWishlist = () => {
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

  const wishItemsRef = useRef<Swipeable[]>([]);
  const prevOpenedRow = useRef<Swipeable>();

  const closeRow = (index: number) => {
    // close other rows except the one that is being swiped
    if (
      prevOpenedRow.current &&
      prevOpenedRow.current !== wishItemsRef.current[index]
    ) {
      prevOpenedRow.current.close();
    }
    prevOpenedRow.current = wishItemsRef.current[index];
  };

  return (
    <View style={[styles.wishlist]}>
      <Tabs.FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <AccountWishItem
              item={item}
              itemIndex={index}
              closeRow={closeRow}
              wishItemsRef={wishItemsRef}
              fulfilled={index % 2 === 1}
            />
          );
        }}
        contentContainerStyle={{
          gap: 14,
          paddingTop: 16,
          paddingBottom: 20,
          paddingHorizontal: 16,
        }}
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity
        style={{
          zIndex: 6,
          right: 20,
          bottom: 80,
          padding: 10,
          elevation: 2,
          borderRadius: 50,
          position: "absolute",
          backgroundColor: "#222",
        }}
      >
        <ListPlus size={20} color="#fff" weight="regular" />
      </TouchableOpacity>
    </View>
  );
};

export default AccountWishlist;

const styles = StyleSheet.create({
  wishlist: {
    flex: 1,
    flexDirection: "column",
  },
});
