import BottomSheet, {
  BottomSheetFooter,
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import Layout from "constants/Layout";
import { View, StyleSheet, TouchableOpacity, Keyboard } from "react-native";
import { primaryColor } from "constants/Colors";
import { useModals } from "providers/ModalsProvider";
import { useCallback, useMemo, useState } from "react";
import { RgText, Text } from "components/_ui/typography";
import CustomBackground from "components/modals/custombackground";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

import TipsTab from "./tabs/tips";
import LikesTab from "./tabs/likes";
import CommentsTab from "./tabs/comments";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { PaperPlane } from "phosphor-react-native";

const renderScene = SceneMap({
  comments: CommentsTab,
  likes: LikesTab,
  tips: TipsTab,
});

const PostInteractionsModal = () => {
  const insets = useSafeAreaInsets();
  const fullHeight = Layout.window.height - insets.top;

  const { postInteractionsRef } = useModals();

  // Tabview config
  const tabLabelWidth = 76;
  const tabBarWidth = Layout.window.width - 40;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "comments", title: "Comments" },
    { key: "likes", title: "Likes" },
    { key: "tips", title: "Tips" },
  ]);

  // Bottomsheet config
  const [showInput, setShowInput] = useState(true);
  const snapPoints = useMemo(() => [0.7 * fullHeight, fullHeight], []);
  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter
        {...props}
        bottomInset={insets.bottom}
        style={{
          borderColor: "#e8e8e8",
          backgroundColor: "#fff",
          borderTopWidth: index === 0 ? 1 : 0,
        }}
      >
        {(index === 0 || showInput) && (
          <View style={[styles.commentInput, { borderColor: "#ddd" }]}>
            <BottomSheetTextInput
              keyboardType="twitter"
              placeholder="Add a comment…"
              placeholderTextColor={"#888"}
              style={[styles.input, { color: "#000" }]}
            />
            <TouchableOpacity
              style={[
                styles.addCommentBtn,
                {
                  backgroundColor: "#eee",
                },
              ]}
            >
              <PaperPlane size={18} weight="fill" color={primaryColor} />
            </TouchableOpacity>
          </View>
        )}
      </BottomSheetFooter>
    ),
    [index]
  );

  // animated index
  const animatedIndex = useSharedValue(0);
  const contentAnimatedStyle = useAnimatedStyle(() => ({
    height: interpolate(
      animatedIndex.value,
      [0, 1],
      [
        0.7 * fullHeight - 36, // handle's height
        fullHeight - 36,
      ]
    ),
  }));

  return (
    <BottomSheet
      index={-1}
      enableOverDrag={false}
      enablePanDownToClose
      snapPoints={snapPoints}
      ref={postInteractionsRef}
      keyboardBehavior="extend"
      enableDynamicSizing={false}
      animatedIndex={animatedIndex}
      keyboardBlurBehavior="restore"
      footerComponent={renderFooter}
      handleStyle={{ paddingBottom: 20 }}
      handleIndicatorStyle={{
        backgroundColor: "rgba(0,0,0,0.2)",
      }}
      backdropComponent={(props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      backgroundComponent={(props: BottomSheetBackdropProps) => (
        <CustomBackground {...props} />
      )}
    >
      <Animated.View
        onTouchStart={() => Keyboard.dismiss()}
        style={[
          styles.container,
          {
            // paddingBottom: insets.bottom,
          },
          contentAnimatedStyle,
        ]}
      >
        <TabView
          lazy
          style={{ width: "100%" }}
          swipeEnabled={false}
          onIndexChange={setIndex}
          renderScene={renderScene}
          navigationState={{ index, routes }}
          initialLayout={{ width: Layout.window.width }}
          sceneContainerStyle={{
            borderWidth: 0,
            borderTopWidth: 1,
            borderColor: "#ececec",
          }}
          renderLazyPlaceholder={({ route }) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <RgText>Loading {route.title}…</RgText>
              </View>
            );
          }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{
                height: 2,
                backgroundColor: primaryColor,
              }}
              gap={
                (tabBarWidth - routes.length * tabLabelWidth) /
                (routes.length - 1)
              }
              tabStyle={{
                minHeight: 0,
                width: "auto",
                height: "auto",
                paddingVertical: 0,
                paddingTop: 6,
                paddingBottom: 12,
                paddingHorizontal: 0,
              }}
              style={{
                height: "auto",
                width: tabBarWidth,
                alignSelf: "center",
                marginHorizontal: 20,
                borderBottomWidth: 0,
                backgroundColor: "#fff",
                borderBottomColor: "#ececec",
              }}
              onTabPress={({ route, preventDefault }) => {
                preventDefault(); // intercept navigation
                setShowInput(route.key === "comments");
                setIndex(
                  route.key === "likes" ? 1 : route.key === "tips" ? 2 : 0
                );
              }}
              renderLabel={({ route, focused, color }) => (
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: "center",
                    width: tabLabelWidth,
                    color: focused ? "#000" : "#888",
                  }}
                >
                  {route.title}
                </Text>
              )}
            />
          )}
        />

        <View />
      </Animated.View>
    </BottomSheet>
  );
};

export default PostInteractionsModal;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    overflow: "hidden",
    alignItems: "center",
    flexDirection: "column",
  },

  commentInput: {
    gap: 10,
    height: 46,
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 6,
    marginVertical: 12,
    marginHorizontal: 12,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    fontSize: 14,
    marginLeft: 4,
    height: "100%",
    fontFamily: "DMSans-Regular",
  },
  addCommentBtn: {
    aspectRatio: 1,
    height: "100%",
    borderRadius: 20,
    paddingBottom: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
