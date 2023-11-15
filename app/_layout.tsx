import "config/axiosConfig";
import { useFonts } from "expo-font";
import { Fragment, useEffect } from "react";
import { Providers } from "providers/Providers";
import { SplashScreen, Stack } from "expo-router";
import AppToast from "components/_common/appToast";

// Modals
import EditProfileModal from "components/modals/edit-profile";
import WithdrawalModal from "components/modals/withdraw-popup";
import ContentOptionsModal from "components/modals/content-options";
import DepositAddressesModal from "components/modals/deposit-address";
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
  initialRouteName: "(onboarding)",
};

function RootLayoutNav() {
  return (
    <Providers>
      <Fragment>
        <Stack
          initialRouteName="(onboarding)"
          screenOptions={{ headerShown: false, animation: "fade" }}
        >
          <Stack.Screen name="index" redirect />

          <Stack.Screen
            name="livestream"
            options={{
              gestureDirection: "vertical",
              animation: "fade_from_bottom",
              presentation: "fullScreenModal",
            }}
          />

          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(onboarding)" options={{ animation: "fade" }} />
          <Stack.Screen
            name="shareQR"
            options={{ presentation: "modal", animation: "slide_from_bottom" }}
          />
          <Stack.Screen
            name="scanQR"
            options={{ presentation: "modal", animation: "slide_from_bottom" }}
          />
          <Stack.Screen
            name="upload"
            options={{
              gestureDirection: "vertical",
              animation: "fade_from_bottom",
              presentation: "fullScreenModal",
            }}
          />
        </Stack>

        <WithdrawalModal />
        <EditProfileModal />
        <ContentOptionsModal />
        <PostInteractionsModal />
        <DepositAddressesModal />

        <AppToast />
      </Fragment>
    </Providers>
  );
}
