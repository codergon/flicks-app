import {
  Gift,
  MessageCircle,
  MoreHorizontal,
  CircleDollarSign,
  GalleryVerticalEnd,
} from "lucide-react-native";
import styles from "./post.styles";
import PostMedia from "./postMedia";
import Layout from "constants/Layout";
import { useRef, useState } from "react";
import { Lock } from "phosphor-react-native";
import Creator from "components/shared/creator";
import { primaryColor } from "constants/Colors";
import { LightText, RgText, Text } from "components/_ui/typography";
import { Animated, FlatList, TouchableOpacity, View } from "react-native";
import { useModals } from "providers/ModalsProvider";

interface PostProps {
  isPaid?: boolean;
  showBorder?: boolean;
  containsMedia?: boolean;
}

const Post = ({
  isPaid = true,
  containsMedia = true,
  showBorder,
}: PostProps) => {
  const data = [1, 2, 3];
  const scrollX = useRef(new Animated.Value(0)).current;

  const { openPostIntractionsModal } = useModals();

  const [currentIndex, setCurrentIndex] = useState(0);
  const handleViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any; changed: any }) => {
      setCurrentIndex(viewableItems[0]?.index || 0);
    }
  ).current;
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50, // how many % of the item would be visible to consider it as visible
  }).current;

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
        <Creator
          size={42}
          item={{
            subText: "30m ago",
          }}
        />

        <View style={{ gap: 10, flexDirection: "row", alignItems: "center" }}>
          {isPaid ? (
            <Text style={{ color: primaryColor }}>Subscribe</Text>
          ) : (
            <MoreHorizontal size={16} color="#000" strokeWidth={2} />
          )}
        </View>
      </View>

      <View style={[styles.post_textContainer]}>
        <LightText numberOfLines={2} style={[styles.post_text]}>
          Hey Everyone, Please check out the new NFT art i created. “Adun” is
          now part of the “ASA” collection.
        </LightText>
      </View>

      {containsMedia && (
        <View style={[styles.post_media]}>
          {!isPaid && (
            <View
              style={[
                styles.post_mediaNumbers,
                {
                  backgroundColor: "rgba(0,0,0,0.1)",
                },
              ]}
            >
              <RgText
                style={{
                  fontSize: 12,
                  color: "#fff",
                }}
              >
                {currentIndex + 1}/{data?.length}
              </RgText>
            </View>
          )}

          {isPaid ? (
            <View
              style={[styles.post_mediaItem, styles.post_mediaItem__locked]}
            >
              <Lock size={22} color="#80848C" />
              <TouchableOpacity style={[styles.subscribeBtn]}>
                <Text style={[{ color: "#fff" }]}>
                  Unlock content for 0.04sol
                </Text>
              </TouchableOpacity>

              {true && (
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
                    3 Items
                  </RgText>
                </View>
              )}
            </View>
          ) : (
            <FlatList
              horizontal
              pagingEnabled
              data={data}
              onScroll={(event) => {
                Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false }
                )(event);
              }}
              viewabilityConfig={viewabilityConfig}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.toString()}
              style={[styles.post_mediaItems_container]}
              contentContainerStyle={[styles.post_mediaItems]}
              onViewableItemsChanged={handleViewableItemsChanged}
              renderItem={({ item, index }) => {
                return <PostMedia item={item} index={index} />;
              }}
            />
          )}
        </View>
      )}

      {!isPaid && (
        <View style={[styles.post_footer]}>
          <View style={[styles.post_stats]}>
            {/* <View style={[styles.post_statsItem]}>
            <Heart size={15} color="#000" strokeWidth={2} />
            <RgText style={[styles.post_statsItemText]}>16</RgText>
          </View> */}
            <TouchableOpacity
              onPress={() => {
                openPostIntractionsModal({
                  type: "comments",
                  data: {
                    numOfComments: 3,
                  },
                });
              }}
              style={[styles.post_statsItem]}
            >
              <MessageCircle size={15} color="#000" strokeWidth={2} />
              <RgText style={[styles.post_statsItemText]}>33k</RgText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                //
              }}
              style={[styles.post_statsItem]}
            >
              <CircleDollarSign size={15} color="#000" strokeWidth={1.9} />
              <RgText style={[styles.post_statsItemText]}>35</RgText>
            </TouchableOpacity>
          </View>

          {/* Ellipses indicating current media item */}
          {containsMedia && (
            <View style={[styles.post_mediaDots]}>
              {data?.map((_, index) => {
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
            <View style={[styles.post_action]}>
              {/* <Share size={16} color="#000" strokeWidth={2} /> */}
              <Gift size={16} color="#000" strokeWidth={2} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Post;
