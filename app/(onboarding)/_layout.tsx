import { useCallback } from "react";
import { StatusBar } from "react-native";
import Loader from "components/_common/Loader";
import useColorScheme from "hooks/useColorScheme";
import { useAccount } from "providers/AccountProvider";
import { Redirect, Stack, useFocusEffect } from "expo-router";

const OnboardingLayout = () => {
  const isDark = useColorScheme() === "dark";
  const { userData, isAuthenticating } = useAccount();

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(isDark ? "light-content" : "dark-content");
    }, [isDark])
  );

  if (isAuthenticating) {
    return <Loader />;
  }

  if (!!userData) {
    return <Redirect href={`/(tabs)/(home)/home`} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: false }} />
  );
};
export default OnboardingLayout;
