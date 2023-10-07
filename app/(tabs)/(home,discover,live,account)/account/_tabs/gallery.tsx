import { StyleSheet, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import ProfileMediaItem from "components/profile/mediaItem";

const MediaGallery = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <Tabs.MasonryFlashList
      data={data}
      numColumns={3}
      renderItem={({ item }) => (
        <ProfileMediaItem
          item={{
            id: item,
          }}
        />
      )}
      estimatedItemSize={200}
      contentContainerStyle={{
        ...styles.listContainer,
      }}
      ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
      onEndReachedThreshold={0.1}
      keyExtractor={(i: any) => i.toString()}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={[{ flex: 1 }]}
    />
  );
};

export default MediaGallery;

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 12,
    paddingBottom: 60,
    paddingHorizontal: 13,
  },
});
