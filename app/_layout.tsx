import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import Layout from "constants/Layout";
import { Providers } from "contexts/Providers";
import useColorScheme from "hooks/useColorScheme";
import { SplashScreen, Stack, withLayoutContext } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetNavigationOptions,
  createBottomSheetNavigator,
} from "@th3rdwave/react-navigation-bottom-sheet";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import CustomBackground from "components/sheet/custombackground";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "DMSans-Medium": require("assets/fonts/DMSans/DMSans-Medium.ttf"),
    "DMSans-Regular": require("assets/fonts/DMSans/DMSans-Regular.ttf"),
    "AcidGrotesk-Medium": require("assets/fonts/AcidGrotesk/AcidGrotesk-Medium.ttf"),
    "AcidGrotesk-Regular": require("assets/fonts/AcidGrotesk/AcidGrotesk-Regular.otf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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

// Bottom Sheet
const { Navigator } = createBottomSheetNavigator();
export const BottomSheet = withLayoutContext<
  BottomSheetNavigationOptions,
  typeof Navigator,
  any,
  any
>(Navigator);

function RootLayoutNav() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Providers>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <BottomSheet
            initialRouteName="(tabs)"
            screenOptions={{
              backgroundComponent: (props: BottomSheetBackdropProps) => (
                <CustomBackground {...props} />
              ),
              backdropComponent: (props: BottomSheetBackdropProps) => (
                <BottomSheetBackdrop
                  {...props}
                  appearsOnIndex={0}
                  disappearsOnIndex={-1}
                />
              ),
            }}
          >
            <BottomSheet.Screen name="index" redirect />
            <BottomSheet.Screen name="(tabs)" />
            <BottomSheet.Screen
              name="modals/upload-options/index"
              getId={({ params }) => `sheet-${params?.id ?? 1}`}
              options={{
                index: 0,
                snapPoints: [
                  190 + // options-height
                    16 + // gap between options and header
                    24 + // padding top
                    insets.bottom +
                    10 + // padding bottom
                    24, // header height
                ],
              }}
            />

            {/* <BottomSheet.Screen
              name="modals/upload-options"
              getId={({ params }) => `sheet-${params?.id ?? 1}`}
              options={{
                snapPoints: ["50%", Layout.window.height - insets.top],
                index: 0,
              }}
            /> */}
          </BottomSheet>

          {/* <Stack initialRouteName="(tabs)">
            <Stack.Screen name="index" redirect />
            <Stack.Screen
              name="bottom-sheet"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack> */}
        </ThemeProvider>
      </Providers>
    </GestureHandlerRootView>
  );
}
