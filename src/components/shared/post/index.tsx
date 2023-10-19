import millify from "millify";
import { debounce } from "lodash";
import styles from "./post.styles";
import PostMedia from "./postMedia";
import { IPost } from "typings/post";
import Layout from "constants/Layout";
import { Heart } from "lucide-react-native";
import { Lock } from "phosphor-react-native";
import { schedulePushNotification, useApp } from "providers/AppProvider";
import { primaryColor } from "constants/Colors";
import { useModals } from "providers/ModalsProvider";
import PostCreator from "components/shared/postCreator";
import { useCallback, useEffect, useRef, useState } from "react";
import { LightText, RgText, Text } from "components/_ui/typography";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { Gift, MessageCircle, GalleryVerticalEnd } from "lucide-react-native";
import { useAccount } from "providers/AccountProvider";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PostComment from "../comment";

interface PostProps {
  post: IPost;
  showBorder?: boolean;

  showInteractions?: boolean;
}

const Post = ({ post, showBorder, showInteractions = true }: PostProps) => {
  const insets = useSafeAreaInsets();
  const { handleLike } = useApp();
  const { userSignature, userData } = useAccount();
  const { openPostIntractionsModal } = useModals();

  // Media items flatlist
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const handleViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any; changed: any }) => {
      setCurrentIndex(viewableItems[0]?.index || 0);
    }
  ).current;
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50, // how many % of the item would be visible to consider it as visible
  }).current;

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    setIsLiked(post?.is_liked);
    setLikesCount(Number(post?.likes_count ?? 0));
  }, [post?.is_liked]);

  const debouncedFetchData = useCallback(
    debounce((action: "like" | "unlike") => {
      handleLike(post?.id, action);
    }, 500),
    []
  );

  const [unlocking, setUnlocking] = useState(false);

  const handleUnlock = async () => {
    if (!userSignature) return;

    try {
      setUnlocking(true);

      await axios.post(`/contents/${post?.id}/pay`, undefined, {
        headers: {
          Authorization: `Signature ${userSignature?.publicKey}:${userSignature?.signature}`,
        },
      });

      //  await refetch?.();
    } catch (e: any) {
      console.log(e?.response?.data?.message);
      Toast.show({
        type: "error",
        topOffset: insets.top + 10,
        text1: "Purchase failed",
        text2: "An error occured while trying to purchase this content.",
      });
    } finally {
      setUnlocking(false);
    }
  };

  return (
    <View
      style={[
        styles.post,
        {
          borderBottomWidth: showBorder ? 1 : 0,
          borderBottomColor: "#ebebeb",
          backgroundColor: "#fff",
        },
      ]}
    >
      <View style={[styles.post_header]}>
        <PostCreator
          size={42}
          data={{
            ...post?.creator,
            created_at: post?.created_at,
          }}
        />

        {/* <View style={{ gap: 10, flexDirection: "row", alignItems: "center" }}>
          {true ? (
            <Text style={{ color: primaryColor }}>Subscribe</Text>
          ) : (
            <MoreHorizontal size={16} color="#000" strokeWidth={2} />
          )}
        </View> */}
      </View>

      {post?.caption && (
        <View style={[styles.post_textContainer]}>
          <LightText numberOfLines={2} style={[styles.post_text]}>
            {post?.caption}
          </LightText>
        </View>
      )}

      {post?.media && post?.media?.length > 0 && (
        <View style={[styles.post_media]}>
          {!post?.is_purchased ? (
            <>
              <View
                style={[styles.post_mediaItem, styles.post_mediaItem__locked]}
              >
                <Lock size={22} color="#80848C" />
                <TouchableOpacity
                  disabled={unlocking}
                  onPress={handleUnlock}
                  style={[styles.subscribeBtn]}
                >
                  <Text style={[{ color: "#fff" }]}>
                    Unlock content for {post?.price} USDC
                  </Text>

                  {unlocking && (
                    <ActivityIndicator
                      size={"small"}
                      style={{
                        right: 16,
                        position: "absolute",
                      }}
                      color={"#fff"}
                    />
                  )}
                </TouchableOpacity>

                {post?.media?.length > 1 && (
                  <View style={[styles.post_mediaNumbers__locked]}>
                    <GalleryVerticalEnd
                      size={14}
                      strokeWidth={2.2}
                      color="#80848C"
                    />
                    <RgText
                      style={{
                        fontSize: 12,
                        paddingTop: 1,
                        color: "#80848C",
                      }}
                    >
                      {post?.media?.length}{" "}
                      {post?.media?.length > 1 ? "items" : "item"}
                    </RgText>
                  </View>
                )}
              </View>
            </>
          ) : (
            <>
              {post?.media?.length > 1 && (
                <View
                  style={[
                    styles.post_mediaNumbers,
                    {
                      backgroundColor: "rgba(0,0,0,0.16)",
                    },
                  ]}
                >
                  <RgText
                    style={{
                      fontSize: 12,
                      color: "#fff",
                    }}
                  >
                    {currentIndex + 1}/{post?.media?.length}
                  </RgText>
                </View>
              )}

              <FlatList
                horizontal
                pagingEnabled
                data={post?.media ?? []}
                bounces={post?.media?.length > 1}
                onScroll={(event) => {
                  Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                  )(event);
                }}
                keyExtractor={(item) => item.s3_key}
                viewabilityConfig={viewabilityConfig}
                showsHorizontalScrollIndicator={false}
                style={[styles.post_mediaItems_container]}
                contentContainerStyle={[styles.post_mediaItems]}
                onViewableItemsChanged={handleViewableItemsChanged}
                renderItem={({ item, index }) => {
                  return <PostMedia media={item} index={index} />;
                }}
              />
            </>
          )}
        </View>
      )}

      {post?.is_purchased &&
        (showInteractions ? (
          <View style={[styles.post_footer]}>
            <View style={[styles.post_stats]}>
              {/* Likes */}
              <TouchableOpacity
                onPress={() => {
                  setIsLiked((l) => !l);
                  setLikesCount((c) => (isLiked ? c - 1 : c + 1));
                  debouncedFetchData(!isLiked ? "like" : "unlike");
                }}
                style={[styles.post_statsItem]}
              >
                {isLiked ? (
                  <Heart
                    size={16}
                    fill="#FF2F40"
                    color={"#FF2F40"}
                    strokeWidth={2}
                  />
                ) : (
                  <Heart size={16} color="#000" strokeWidth={2} />
                )}
                <RgText style={[styles.post_statsItemText]}>
                  {millify(likesCount, {
                    precision: 2,
                    lowercase: true,
                  })}
                </RgText>
              </TouchableOpacity>

              {/* Comments */}
              <TouchableOpacity
                onPress={() => {
                  openPostIntractionsModal({
                    type: "comments",
                    data: {
                      postId: post?.id || "",
                      comments: post?.comments,
                    },
                  });
                }}
                style={[styles.post_statsItem]}
              >
                <MessageCircle size={15} color="#000" strokeWidth={2} />
                <RgText style={[styles.post_statsItemText]}>
                  {millify(post?.comments_count ?? 0, {
                    precision: 2,
                    lowercase: true,
                  })}
                </RgText>
              </TouchableOpacity>
            </View>

            {/* Ellipses indicating current media item */}
            {post?.media?.length > 1 && false && (
              <View style={[styles.post_mediaDots]}>
                {[1, 2, 3]?.map((_, index) => {
                  const dotWidth = scrollX.interpolate({
                    inputRange: [
                      (index - 1) * Layout.window.width,
                      index * Layout.window.width,
                      (index + 1) * Layout.window.width,
                    ],
                    outputRange: [6, 12, 6],
                    extrapolate: "clamp",
                  });

                  const backgroundColor = scrollX.interpolate({
                    inputRange: [
                      (index - 1) * Layout.window.width,
                      index * Layout.window.width,
                      (index + 1) * Layout.window.width,
                    ],
                    outputRange: ["#ddd", primaryColor, "#ddd"],
                    extrapolate: "clamp",
                  });

                  return (
                    <Animated.View
                      key={index}
                      style={[
                        styles.post_mediaDot,
                        {
                          width: dotWidth,
                          backgroundColor:
                            index === currentIndex ? primaryColor : "#ddd",
                        },
                      ]}
                    />
                  );
                })}
              </View>
            )}

            <View style={[styles.post_actions]}>
              <TouchableOpacity
                onPress={() => {
                  schedulePushNotification({
                    title: "Coming soon",
                    body: "Tipping is not yet available. We are working on it. Stay tuned!",
                  });

                  // Toast.show({
                  //   type: "success",
                  //   topOffset: insets.top + 10,
                  //   text1: "Coming soon",
                  //   text2:
                  //     "Tipping is not yet available. We are working on it. Stay tuned!",
                  // });
                }}
                style={[
                  styles.post_action,
                  {
                    paddingVertical: 4,
                    paddingHorizontal: 6,
                  },
                ]}
              >
                {/* <Share size={16} color="#000" strokeWidth={2} /> */}
                <Gift size={16} color="#000" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <View
              style={{
                gap: 10,
                paddingVertical: 16,
                paddingHorizontal: 16,
                flexDirection: "column",
              }}
            >
              {post?.likes_count > 0 && (
                <RgText>
                  Liked by{post?.is_liked ? " you and" : ""}{" "}
                  {post?.likes_count - (post?.is_liked ? 1 : 0)}{" "}
                  {(post?.is_liked ? "other " : "") +
                    (post?.likes_count - (post?.is_liked ? 1 : 0) > 1
                      ? "people"
                      : "person")}
                </RgText>
              )}
              {post?.comments_count > 0 && <Text>Comments</Text>}
            </View>
            {post.comments?.map((comment, index) => {
              return <PostComment key={comment?.id} comment={comment} />;
            })}
          </>
        ))}
    </View>
  );
};

export default Post;
