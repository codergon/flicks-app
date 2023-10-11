import "react-native-gesture-handler";
import dayjs from "dayjs";
import ModalsProvider from "./ModalsProvider";
import duration from "dayjs/plugin/duration";
import AppContextProvider from "./AppProvider";
import AccountProvider from "./AccountProvider";
import { ReactNode, ReactElement } from "react";
import SettingsProvider from "./SettingsProvider";
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
