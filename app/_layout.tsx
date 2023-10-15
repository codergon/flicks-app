import "config/axiosConfig";
import { useFonts } from "expo-font";
import { Fragment, useEffect } from "react";
import { Providers } from "providers/Providers";
import { SplashScreen, Stack } from "expo-router";
import useColorScheme from "hooks/useColorScheme";

// Modals
import EditProfileModal from "components/modals/edit-profile";
import CreateContentModal from "components/modals/create-content";
import PostInteractionsModal from "components/modals/post-interactions";

import Toast, {
  BaseToast,
  ErrorToast,
  BaseToastProps,
} from "react-native-toast-message";
import Layout from "constants/Layout";
import DepositAddressesModal from "components/modals/deposit-address";

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
  const colorScheme = useColorScheme();
  const toastText = colorScheme === "dark" ? "#fff" : "#000";
  const toastText2 = colorScheme === "dark" ? "#999" : "#777";
  const toastBorder = colorScheme === "dark" ? "#333" : "#ccc";
  const toastBackground = colorScheme === "dark" ? "#1b1b1b" : "#fff";

  return (
    <Providers>
      <Fragment>
        <Stack
          initialRouteName="(onboarding)"
          screenOptions={{ headerShown: false, animation: "fade" }}
        >
          <Stack.Screen name="index" redirect />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(onboarding)" options={{ animation: "fade" }} />
          <Stack.Screen
            name="upload"
            options={{
              gestureDirection: "vertical",
              animation: "fade_from_bottom",
              presentation: "fullScreenModal",
            }}
          />
        </Stack>

        <CreateContentModal />
        <PostInteractionsModal />
        <EditProfileModal />
        <DepositAddressesModal />

        <Toast
          config={{
            success: (props: BaseToastProps) => (
              <BaseToast
                {...props}
                {...props}
                style={{
                  height: "auto",
                  borderWidth: 1,
                  paddingLeft: 0,
                  borderRadius: 10,
                  paddingVertical: 0,
                  borderColor: toastBorder,
                  borderLeftColor: "#419B45",
                  width: Layout.window.width - 32,
                  backgroundColor: toastBackground,
                }}
                renderLeadingIcon={() => null}
                contentContainerStyle={{
                  gap: 2,
                  minHeight: 50,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                }}
                text1Style={{
                  fontSize: 14,
                  color: toastText,
                  fontFamily: "AcidGrotesk-Medium",
                }}
                text2Props={{
                  numberOfLines: 2,
                }}
                text2Style={{
                  fontSize: 12,
                  color: toastText2,
                  fontFamily: "DMSans-Medium",
                }}
              />
            ),

            error: (props: BaseToastProps) => (
              <ErrorToast
                {...props}
                style={{
                  height: "auto",
                  borderWidth: 1,
                  paddingLeft: 0,
                  borderRadius: 10,
                  paddingVertical: 0,
                  borderColor: toastBorder,
                  borderLeftColor: "#F83131",
                  width: Layout.window.width - 32,
                  backgroundColor: toastBackground,
                }}
                renderLeadingIcon={() => null}
                contentContainerStyle={{
                  gap: 2,
                  minHeight: 50,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                }}
                text1Style={{
                  fontSize: 14,
                  color: toastText,
                  fontFamily: "AcidGrotesk-Medium",
                }}
                text2Props={{
                  numberOfLines: 2,
                }}
                text2Style={{
                  fontSize: 12,
                  color: toastText2,
                  fontFamily: "DMSans-Medium",
                }}
              />
            ),
          }}
        />
      </Fragment>
    </Providers>
  );
}
