import { Fragment, useState } from "react";
import { StyleSheet, View } from "react-native";
import ProfileMediaItem from "components/profile/mediaItem";
import MasonryList from "@react-native-seoul/masonry-list";

const MediaGallery = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <View style={[styles.gallery]}>
      <MasonryList
        data={data}
        numColumns={3}
        renderItem={({ item, i }) => (
          <Fragment>
            <ProfileMediaItem
              item={{
                id: item,
              }}
            />
          </Fragment>
        )}
        onEndReachedThreshold={0.1}
        keyExtractor={(i) => i.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.listContainer]}
      />
    </View>
  );
};

export default MediaGallery;

const styles = StyleSheet.create({
  gallery: {
    flex: 1,
    gap: 14,
    flexDirection: "column",
  },

  listContainer: {
    flexGrow: 1,
    marginTop: 8,
    paddingBottom: 60,
    paddingHorizontal: 13,
  },
});
