import { useState } from "react";
import { Image } from "expo-image";
import styles from "./profile.styles";
import Layout from "constants/Layout";
import { padding } from "helpers/styles";
import { Gift, Pencil } from "lucide-react-native";
import { primaryColor } from "constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { RgText, Text } from "components/_ui/typography";
import ProfileHeaderBtns from "components/profile/header";
import { TouchableOpacity, View, Animated } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

import PostsTab from "./_tabs/posts";
import MediaGallery from "./_tabs/gallery";
import ProfileWishlist from "./_tabs/wishlist";
import ProfilieUpcomingStreams from "./_tabs/upcoming";
import { StatusBar } from "expo-status-bar";

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

const renderScene = SceneMap({
  posts: PostsTab,
  media: MediaGallery,
  upcoming: ProfilieUpcomingStreams,
  wishlist: ProfileWishlist,
});

const UserProfile = () => {
  const { profile } = useLocalSearchParams<{ profile: string }>();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "posts", title: "Posts" },
    { key: "media", title: "Media" },
    { key: "upcoming", title: "Upcoming" },
    { key: "wishlist", title: "Wishlist" },
  ]);

  const _renderLazyPlaceholder = ({
    route,
  }: {
    route: {
      title: string;
    };
  }) => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <RgText>Loading {route.title}…</RgText>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: "#fff",
        },
      ]}
    >
      <StatusBar style="light" />

      <ProfileHeaderBtns />

      <View style={[styles.profileHeader]}>
        <View
          style={[
            styles.banner,
            {
              backgroundColor: "#f4f4f4",
            },
          ]}
        >
          <Image
            transition={300}
            contentFit="cover"
            style={[styles.bannerImg]}
            source={require("assets/images/mock/5.png")}
          />
        </View>

        <View style={styles.userDetails}>
          <View
            style={[
              styles.avatar,
              {
                borderWidth: 3,
                marginTop: -14,
                borderColor: "#fff",
              },
            ]}
          >
            <Image
              transition={300}
              contentFit="cover"
              style={[styles.avatar_image]}
              source={require("assets/images/mock/6.png")}
            />
          </View>

          <View style={[styles.info_actions]}>
            <View style={[styles.creatorInfo]}>
              <Text style={[styles.creatorInfo__name]}>Jackson Norman</Text>
              <RgText style={[styles.creatorInfo__desc, { color: "#676C75" }]}>
                436 subscribers • 32 contents
              </RgText>
            </View>

            <TouchableOpacity
              style={[
                {
                  zIndex: 99,
                  borderWidth: 1,
                  borderRadius: 30,
                  ...padding(6, 12),
                  alignItems: "center",
                  paddingHorizontal: 16,
                  justifyContent: "center",
                  borderColor: "#ccc",
                  // backgroundColor: primaryColor,
                },
              ]}
            >
              <RgText
                style={{
                  fontSize: 12,
                  color: "#000",
                  // letterSpacing: 0.2,
                }}
              >
                Subscribed
              </RgText>
            </TouchableOpacity>

            {/* <View style={[styles.actionBtns]}>
              <TouchableOpacity style={[styles.actionBtn]}>
                <Gift size={16} color="#000" />
              </TouchableOpacity>
            </View> */}
          </View>
        </View>

        <View style={[styles.bio]}>
          <RgText>
            Really outer space! The whole thing. It’s all outer space 🌌🌍
          </RgText>
        </View>
      </View>

      {/* Tabs */}
      <View style={[styles.container]}>
        <TabView
          lazy
          onIndexChange={setIndex}
          renderScene={renderScene}
          navigationState={{ index, routes }}
          initialLayout={{ width: Layout.window.width }}
          renderLazyPlaceholder={_renderLazyPlaceholder}
          sceneContainerStyle={{
            borderWidth: 0,
            borderTopWidth: 1,
            borderColor: "#ececec",
          }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{
                height: 2,
                backgroundColor: primaryColor,
              }}
              tabStyle={{
                width: "auto",
                paddingHorizontal: 4,
              }}
              gap={24}
              contentContainerStyle={{
                width: Layout.window.width - 32,
              }}
              style={{
                height: 44,
                marginLeft: 16,
                width: Layout.window.width - 32,
                backgroundColor: "transparent",
              }}
              renderLabel={({ route, focused, color }) => (
                <RgText
                  style={{
                    fontSize: 14,
                    color: focused ? "#000" : "#888",
                  }}
                >
                  {route.title}
                </RgText>
              )}
            />
          )}
        />
      </View>
    </View>
  );
};

export default UserProfile;
