import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Fragment, useEffect } from "react";
import { useFonts } from "expo-font";
import { Providers } from "contexts/Providers";
import { SplashScreen, Stack } from "expo-router";
import useColorScheme from "hooks/useColorScheme";
import CreateContentModal from "components/modals/create-content";
import PostInteractionsModal from "components/modals/post-interactions";

export { ErrorBoundary } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "DMSans-Medium": require("assets/fonts/DMSans/DMSans-Medium.ttf"),
    "DMSans-Regular": require("assets/fonts/DMSans/DMSans-Regular.ttf"),
    "AcidGrotesk-Medium": require("assets/fonts/AcidGrotesk/AcidGrotesk-Medium.ttf"),
    "AcidGrotesk-Regular": require("assets/fonts/AcidGrotesk/AcidGrotesk-Regular.otf"),
  });

  // Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

export const unstable_settings = {
  // initialRouteName: "(tabs)",
  initialRouteName: "upload",
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Providers>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Fragment>
          <Stack
            initialRouteName="upload"
            // initialRouteName="(tabs)"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="index" redirect />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="upload" />
          </Stack>

          <CreateContentModal />
          <PostInteractionsModal />
        </Fragment>
      </ThemeProvider>
    </Providers>
  );
}
