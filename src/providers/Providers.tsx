import "react-native-gesture-handler";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import ModalsProvider from "./ModalsProvider";
import duration from "dayjs/plugin/duration";
import AppContextProvider from "./AppProvider";
import AccountProvider from "./AccountProvider";
import { ReactNode, ReactElement } from "react";
import useColorScheme from "hooks/useColorScheme";
import SettingsProvider from "./SettingsProvider";
import { MenuProvider } from "react-native-popup-menu";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import dayjs from "dayjs";

dayjs.extend(duration);
const queryClient = new QueryClient();

export const Providers = ({
  children,
}: {
  children: ReactElement | ReactElement[] | ReactNode;
}) => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
          <AccountProvider>
            <AppContextProvider>
              <ModalsProvider>
                <MenuProvider>
                  <ThemeProvider
                    value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                  >
                    {children}
                  </ThemeProvider>
                </MenuProvider>
              </ModalsProvider>
            </AppContextProvider>
          </AccountProvider>
        </SettingsProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};
