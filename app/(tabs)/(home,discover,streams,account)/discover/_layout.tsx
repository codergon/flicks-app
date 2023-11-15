import { useCallback } from "react";
import { StatusBar } from "react-native";
import { Stack, useFocusEffect } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

const DiscoverLayout = () => {
  useFocusEffect(
    useCallback(() => {
      // Change status bar color
      StatusBar.setBarStyle("dark-content");
    }, [])
  );

  return (
    <Stack
      key="discover"
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default DiscoverLayout;
