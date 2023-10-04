import { Image } from "expo-image";
import styles from "./account.styles";
import { useState } from "react";
import { Gear } from "phosphor-react-native";
import { useLocalSearchParams } from "expo-router";
import { TouchableOpacity, View, Animated } from "react-native";
import { RgText, Text } from "components/_ui/typography";
import ProfileHeaderBtns from "components/account/header";
import { Pencil } from "lucide-react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Layout from "constants/Layout";
import { primaryColor } from "constants/Colors";
import PostsTab from "./_tabs/posts";
import MediaTab from "./_tabs/media";
import MediaGallery from "./_tabs/gallery";

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

const Page = () => {
  return <Text>Test</Text>;
};

const renderScene = SceneMap({
  posts: PostsTab,
  media: MediaGallery,
  upcoming: Page,
  transactions: Page,
  wishlist: Page,
});

const UserAccount = () => {
  const { profile } = useLocalSearchParams<{ profile: string }>();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "posts", title: "Posts" },
    { key: "media", title: "Media" },
    { key: "upcoming", title: "Upcoming" },
    { key: "transactions", title: "Transactions" },
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

            <View style={[styles.actionBtns]}>
              <TouchableOpacity style={[styles.actionBtn]}>
                <Pencil size={16} color="#000" />
                {/* <Gear size={20} color="#000" weight="regular" /> */}
              </TouchableOpacity>
            </View>
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
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{
                height: 1.6,
                borderRadius: 4,
                backgroundColor: primaryColor,
              }}
              scrollEnabled
              gap={32}
              contentContainerStyle={
                {
                  // paddingHorizontal: 16,
                }
              }
              indicatorContainerStyle={
                {
                  // paddingHorizontal: 16,
                }
              }
              tabStyle={{
                width: "auto",
              }}
              style={{
                height: 44,
                borderBottomWidth: 1,
                borderBottomColor: "#ececec",
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

export default UserAccount;
