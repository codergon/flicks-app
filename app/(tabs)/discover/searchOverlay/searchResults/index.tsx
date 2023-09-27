import * as React from "react";
import { View } from "react-native";
import MediaTab from "../_tabs/media";
import Layout from "constants/Layout";
import AllResults from "../_tabs/all";
import PostsTab from "../_tabs/posts";
import CreatorsTab from "../_tabs/creators";
import { styles } from "./searchResults.styles";
import { primaryColor } from "constants/Colors";
import { RgText } from "components/ui/typography";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

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

  return (
    <View style={[styles.container]}>
      <TabView
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
              backgroundColor: "transparent",
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
        onIndexChange={setIndex}
        renderScene={renderScene}
        navigationState={{ index, routes }}
        initialLayout={{ width: Layout.window.width }}
      />
    </View>
  );
};

export default SearchResults;
