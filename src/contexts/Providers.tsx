import "react-native-gesture-handler";

import dayjs from "dayjs";
import ModalsProvider from "./ModalsContext";
import duration from "dayjs/plugin/duration";
import AppContextProvider from "./AppContext";
import AccountProvider from "./AccountContext";
import { ReactNode, ReactElement } from "react";
import SettingsProvider from "./SettingsContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

dayjs.extend(duration);

export const Providers = ({
  children,
}: {
  children: ReactElement | ReactElement[] | ReactNode;
}) => {
  return (
    <SettingsProvider>
      <AccountProvider>
        <AppContextProvider>
          <ModalsProvider>
            <SafeAreaProvider>{children}</SafeAreaProvider>
          </ModalsProvider>
        </AppContextProvider>
      </AccountProvider>
    </SettingsProvider>
  );
};
