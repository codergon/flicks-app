import * as React from "react";
import MediaTab from "../_tabs/media";
import Layout from "constants/Layout";
import AllResults from "../_tabs/all";
import PostsTab from "../_tabs/posts";
import CreatorsTab from "../_tabs/creators";
import { View, Animated } from "react-native";
import { styles } from "./searchResults.styles";
import { primaryColor } from "constants/Colors";
import { RgText } from "components/_ui/typography";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

import { Tabs, MaterialTabBar } from "react-native-collapsible-tab-view";

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

const renderScene = SceneMap({
  all: AllResults,
  posts: PostsTab,
  creators: CreatorsTab,
  media: MediaTab,
});

const SearchResults = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "all", title: "All" },
    { key: "posts", title: "Posts" },
    { key: "creators", title: "Creators" },
    { key: "media", title: "Media" },
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
    <View style={[styles.container]}>
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
        renderTabBar={(props) => (
          <MaterialTabBar
            {...props}
            scrollEnabled
            inactiveColor="#444"
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
              opacity: 1,
              fontSize: 14,
              fontWeight: "100",
              textTransform: "capitalize",
              fontFamily: "DMSans-Medium",
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
        <Tabs.Tab name="All">
          <AllResults />
        </Tabs.Tab>
        <Tabs.Tab name="Posts">
          <PostsTab />
        </Tabs.Tab>
        <Tabs.Tab name="Creators">
          <CreatorsTab />
        </Tabs.Tab>
        <Tabs.Tab name="Media">
          <MediaTab />
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  );
};

export default SearchResults;
