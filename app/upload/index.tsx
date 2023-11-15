import Layout from "constants/layout";
import { StatusBar } from "react-native";
import { useFocusEffect } from "expo-router";
import { useApp } from "providers/AppProvider";
import { Container } from "components/_ui/custom";
import UploadFooter from "components/upload/footer";
import { useCallback, useRef, useState } from "react";
import ImageMedia from "components/upload/ImageMedia";
import VideoMedia from "components/upload/VideoMedia";
import { View, Animated, FlatList } from "react-native";
import UploadHeaderBtns from "components/upload/header";
import UploadMediaPreview from "components/upload/mediaPreview";

const Upload = () => {
  const { selectedMedia } = useApp();

  const scrollToIndex = (index: number) => {
    flatListRef?.current?.scrollToIndex({ animated: true, index: index });
  };

  // Logic for selected media preview
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any; changed: any }) => {
      setCurrentIndex(viewableItems[0]?.index || 0);
    }
  ).current;
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  useFocusEffect(
    useCallback(() => {
      // Change status bar color
      StatusBar.setBarStyle("light-content");
    }, [])
  );

  return (
    <Container
      style={[
        {
          backgroundColor: "#000",
        },
      ]}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          position: "relative",
        }}
      >
        <UploadHeaderBtns />

        <FlatList
          horizontal
          data={selectedMedia}
          pagingEnabled
          ref={flatListRef}
          decelerationRate="fast"
          snapToInterval={Layout.window.width + 10}
          ItemSeparatorComponent={() => (
            <View style={{ width: 10, height: "100%" }} />
          )}
          renderItem={({ item, index }) => (
            <>
              {item?.type === "video" ? (
                <VideoMedia media={item} />
              ) : (
                <ImageMedia media={item} />
              )}
            </>
          )}
          onScroll={(event) => {
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )(event);
          }}
          showsVerticalScrollIndicator={false}
          viewabilityConfig={viewabilityConfig}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          onViewableItemsChanged={handleViewableItemsChanged}
        />

        <UploadMediaPreview
          currentIndex={currentIndex}
          scrollToIndex={scrollToIndex}
        />
      </View>

      <UploadFooter currentMedia={selectedMedia[currentIndex]} />
    </Container>
  );
};

export default Upload;
