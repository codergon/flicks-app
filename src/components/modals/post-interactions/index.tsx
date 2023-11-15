import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import Layout from "constants/layout";
import {
  View,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useMemo, useState } from "react";
import { primaryColor } from "constants/colors";
import { useModals } from "providers/ModalsProvider";
import CustomBackground from "components/modals/custombackground";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import TipsTab from "./tabs/tips";
import CommentsTab from "./tabs/comments";
import { PaperPlane } from "phosphor-react-native";
import { Tabs, MaterialTabBar } from "react-native-collapsible-tab-view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PostInteractionsModal = () => {
  const insets = useSafeAreaInsets();
  const fullHeight = Layout.window.height - insets.top;

  const {
    addComment,
    isCommenting,
    postInteractionsRef,
    onClosePostIntractionsModal,
  } = useModals();

  // Tabview config
  const tabLabelWidth = 76;
  const tabBarWidth = Layout.window.width - 40;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "comments", title: "Comments" },
    { key: "likes", title: "Likes" },
    { key: "tips", title: "Tips" },
  ]);

  const [comment, setComment] = useState("");

  // Bottomsheet config
  const [showInput, setShowInput] = useState(true);
  const snapPoints = useMemo(
    () => [
      0.7 * fullHeight,
      //  fullHeight
    ],
    []
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
      enablePanDownToClose
      enableOverDrag={false}
      snapPoints={snapPoints}
      ref={postInteractionsRef}
      keyboardBehavior="extend"
      enableDynamicSizing={false}
      animatedIndex={animatedIndex}
      keyboardBlurBehavior="restore"
      onClose={() => {
        setComment("");
        Keyboard.dismiss();
        onClosePostIntractionsModal();
      }}
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
        style={[styles.container, contentAnimatedStyle]}
      >
        <Tabs.Container
          lazy
          tabBarHeight={70}
          snapThreshold={0.5}
          // @ts-ignore
          headerContainerStyle={{
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          }}
          onIndexChange={(index) => {
            setIndex(index);
            setShowInput(index === 0);
          }}
          renderTabBar={(props) => (
            <MaterialTabBar
              {...props}
              scrollEnabled
              inactiveColor="#777"
              indicatorStyle={{
                height: 2,
                backgroundColor: primaryColor,
              }}
              tabStyle={{
                width: "auto",
                paddingTop: 6,
                height: "auto",
                marginBottom: 0,
                paddingBottom: 10,
                marginVertical: 0,
                paddingHorizontal: 10,
              }}
              labelStyle={{
                fontSize: 14,
                textTransform: "capitalize",
                fontFamily: "AcidGrotesk-Medium",
              }}
              contentContainerStyle={{
                gap: 16,
                paddingVertical: 0,
                paddingHorizontal: 20,
              }}
              style={{
                height: "auto",
                paddingVertical: 0,
                borderBottomWidth: 1,
                backgroundColor: "#fff",
                borderBottomColor: "#ececec",
              }}
            />
          )}
        >
          <Tabs.Tab name="Comments">
            <CommentsTab />
          </Tabs.Tab>
          <Tabs.Tab name="Tips">
            <TipsTab />
          </Tabs.Tab>
        </Tabs.Container>

        <KeyboardAwareScrollView
          style={{
            left: 0,
            bottom: 0,
            overflow: "visible",
            position: "absolute",
            borderColor: "#e8e8e8",
            backgroundColor: "#fff",
            width: Layout.window.width,
            // paddingBottom: index === 0 ? insets.bottom : 0,
          }}
        >
          <View
            style={{
              borderColor: "#e8e8e8",
              backgroundColor: "#fff",
              width: Layout.window.width,
              borderTopWidth: index === 0 ? 1 : 0,
              paddingBottom: index === 0 ? insets.bottom : 0,
            }}
          >
            {(index === 0 || showInput) && (
              <View style={[styles.commentInput, { borderColor: "#ddd" }]}>
                <BottomSheetTextInput
                  value={comment}
                  keyboardType="twitter"
                  editable={!isCommenting}
                  placeholder="Add a comment of at least 3 characters…"
                  placeholderTextColor={"#888"}
                  onChangeText={(text) => setComment(text)}
                  style={[styles.input, { color: "#000", height: 64 }]}
                />
                <TouchableOpacity
                  disabled={isCommenting || comment?.trim()?.length < 3}
                  style={[
                    styles.addCommentBtn,
                    {
                      borderWidth: 0.4,
                      backgroundColor: "#eee",
                      borderColor: primaryColor,
                      opacity: comment?.trim()?.length < 3 ? 0.7 : 1,
                    },
                  ]}
                  onPress={() => {
                    Keyboard.dismiss();
                    addComment(comment, () => setComment(""));
                  }}
                >
                  {isCommenting ? (
                    <ActivityIndicator
                      size="small"
                      color={"#000"}
                      style={{ transform: [{ scale: 0.9 }] }}
                    />
                  ) : (
                    <PaperPlane size={18} weight="fill" color={primaryColor} />
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
      </Animated.View>
    </BottomSheet>
  );
};

export default PostInteractionsModal;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    overflow: "hidden",
    position: "relative",
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
