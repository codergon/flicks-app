import { FlatList, View } from "react-native";
import PostComment from "components/shared/comment";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CommentsTab = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        flexDirection: "column",
        paddingBottom: insets.bottom,
      }}
    >
      <FlatList
        data={Array.from({ length: 20 })}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <PostComment />;
        }}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 80 }}
      />
    </View>
  );
};

export default CommentsTab;
