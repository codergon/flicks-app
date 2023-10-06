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
            style={{
              height: 44,
              borderBottomWidth: 1,
              borderBottomColor: "#ececec",
              backgroundColor: "#fff",
            }}
            renderLabel={({ route, focused, color }) => (
              <RgText
                style={{
                  fontSize: 15,
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
  );
};

export default SearchResults;
