import { useCallback, useState } from "react";
import Layout from "constants/Layout";
import { styles } from "./live.styles";
import { View, Animated, StatusBar } from "react-native";
import { primaryColor } from "constants/Colors";
import { Container } from "components/_ui/custom";
import { RgText, Text } from "components/_ui/typography";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

import OngoingStreams from "./_tabs/ongoing";
import UpcomingStreams from "./_tabs/upcoming";
import { useFocusEffect } from "expo-router";

// import { StatusBar } from "expo-status-bar";

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

const renderScene = SceneMap({
  ongoing: OngoingStreams,
  upcoming: UpcomingStreams,
});

const LiveStreams = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "ongoing", title: "Ongoing" },
    { key: "upcoming", title: "Upcoming" },
  ]);

  useFocusEffect(
    useCallback(() => {
      // Change status bar color
      StatusBar.setBarStyle("dark-content");
    }, [])
  );

  return (
    <Container
      style={[
        styles.container,
        {
          backgroundColor: "#fff",
        },
      ]}
    >
      <View style={[styles.header]}>
        <Text style={[styles.headerTitle]}>Live Streams</Text>
      </View>

      {/* Tabs */}
      <View style={[styles.container]}>
        <TabView
          lazy
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
              gap={32}
              tabStyle={{
                width: "auto",
                paddingHorizontal: 4,
              }}
              style={{
                height: 44,
                marginLeft: 20,
                borderBottomWidth: 0,
                backgroundColor: "#fff",
                borderBottomColor: "#ececec",
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
    </Container>
  );
};

export default LiveStreams;
