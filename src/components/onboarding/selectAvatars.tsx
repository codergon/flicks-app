import { Image } from "expo-image";
import Layout from "constants/layout";
import { padding } from "helpers/styles";
import { useEffect, useRef } from "react";
import useColorScheme from "hooks/useColorScheme";
import { View, Animated, FlatList, StyleSheet } from "react-native";

interface SelectAvatarsProps {
  setSelectedAvatar: (avatar: string) => void;
}

const avatars = Array.from({ length: 30 }).map(
  (_, i) => `https://api.dicebear.com/7.x/open-peeps/png?seed=${i}`
);

const baseWidth = 428;

const SelectAvatars = ({ setSelectedAvatar }: SelectAvatarsProps) => {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const flatList = useRef<FlatList>(null);

  const scrollX = useRef(new Animated.Value(0)).current;
  const width = Layout.window.width;
  const ratio = width / baseWidth;
  const ITEM_SIZE = 78 * ratio;
  const ITEM_SPACING = (width - ITEM_SIZE) / 2;

  useEffect(() => {
    setSelectedAvatar(avatars[16]);
  }, []);

  return (
    <View style={[styles.avatarsContainer]}>
      <FlatList
        horizontal
        pagingEnabled
        ref={flatList}
        bounces={false}
        initialNumToRender={20}
        disableIntervalMomentum
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / ITEM_SIZE
          );
          setSelectedAvatar(avatars[index]);
        }}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            flatList.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
        decelerationRate="fast"
        style={{ flexGrow: 0 }}
        scrollEventThrottle={16}
        initialScrollIndex={16}
        onScroll={(event) => {
          Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })(event);
        }}
        data={avatars}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_SIZE}
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: ITEM_SPACING,
        }}
        keyExtractor={(item, index) => index.toString()}
        //
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 3) * ITEM_SIZE,
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
            (index + 2) * ITEM_SIZE,
            (index + 3) * ITEM_SIZE,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.52, 0.62, 0.76, 1, 0.76, 0.62, 0.52],
          });

          const mr1 = 4 * ratio;
          const mr2 = 34 * ratio;
          const mr3 = 92 * ratio;
          const mr4 = 192 * ratio;

          const marginRight = scrollX.interpolate({
            inputRange: [
              (index - 4) * ITEM_SIZE,
              ...inputRange,
              (index + 4) * ITEM_SIZE,
            ],
            outputRange: [-mr4, -mr3, -mr2, -mr1, 0, mr1, mr2, mr3, mr4],
            extrapolate: "clamp",
          });

          const borderWidth = scrollX.interpolate({
            inputRange: [
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
            ],
            outputRange: [0, 1.4, 0],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={{
                width: ITEM_SIZE,
                height: ITEM_SIZE,
                borderRadius: 100,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Animated.View
                style={[
                  {
                    padding: 3,
                    borderWidth,
                    width: "100%",
                    height: "100%",
                    borderRadius: 100,
                    borderColor: "#419B45",

                    transform: [
                      {
                        scale: scale,
                      },
                      {
                        translateX: marginRight,
                      },
                    ],
                  },
                ]}
              >
                <View
                  style={[
                    {
                      width: "100%",
                      height: "100%",
                      borderRadius: 100,
                      overflow: "hidden",
                      backgroundColor: isDark ? "#222" : "#e2e2e2",
                    },
                  ]}
                >
                  <Image
                    contentFit="cover"
                    style={[
                      {
                        width: "100%",
                        height: "100%",
                        borderRadius: 100,
                        resizeMode: "cover",
                      },
                    ]}
                    source={{ uri: item }}
                  />
                </View>
              </Animated.View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default SelectAvatars;

const styles = StyleSheet.create({
  avatarsContainer: {
    ...padding(24, 0, 34),
    flexDirection: "column",
    width: Layout.window.width,
  },
});
