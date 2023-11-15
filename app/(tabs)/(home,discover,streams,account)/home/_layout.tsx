import { useCallback } from "react";
import { StatusBar } from "react-native";
import { Stack, useFocusEffect } from "expo-router";

const HomeLayout = () => {
  useFocusEffect(
    useCallback(() => {
      // Change status bar color
      StatusBar.setBarStyle("dark-content");
    }, [])
  );

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="topCreators" />
      <Stack.Screen name="suggestedAccounts" />
    </Stack>
  );
};

export default HomeLayout;
