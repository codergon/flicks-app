import { View, Animated, ScrollView, FlatList } from "react-native";
import Layout from "constants/Layout";
import { styles } from "./upload.styles";
import { StatusBar } from "expo-status-bar";
import { Container } from "components/_ui/custom";
import { Fragment, useRef, useState } from "react";
import UploadFooter from "components/upload/footer";
import ImageView from "components/upload/imageView";
import UploadHeaderBtns from "components/upload/header";
import UploadMediaPreview from "components/upload/mediaPreview";

const Upload = () => {
  const [media, setMedia] = useState<any>([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ]);

  const removeItem = (id: string) => {
    setMedia((p: any) => p.filter((item: any) => item.id !== id));
  };

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

  // Edit media
  const editMedia = (action: string) => {
    console.log(action);
  };

  return (
    <Container
      style={[
        {
          backgroundColor: "#000",
        },
      ]}
    >
      <StatusBar style="light" />

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
          data={media}
          pagingEnabled
          ref={flatListRef}
          decelerationRate="fast"
          snapToInterval={Layout.window.width + 10}
          ItemSeparatorComponent={() => (
            <View style={{ width: 10, height: "100%" }} />
          )}
          renderItem={({ item, index }) => <ImageView />}
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
          data={media}
          removeItem={removeItem}
          currentIndex={currentIndex}
          scrollToIndex={scrollToIndex}
        />
      </View>

      <UploadFooter />
    </Container>
  );
};

export default Upload;
