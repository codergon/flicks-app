import {
  ColorSchemeName,
  useColorScheme as _useColorScheme,
} from "react-native";
import { useStorageState } from "hooks/useStorageState";
import { createContext, useContext, useMemo, useState } from "react";

export type Settings = {
  language?: string;
  sync: "on" | "off";
  privacy: "on" | "off";
  currency: "Native" | "Fiat";
  theme: "light" | "dark" | "system";
};

export const SettingsContext = createContext<{
  isDark: boolean;
  settings: Settings;
  // updateSettings: (
  //   key: keyof Settings,
  //   value: Settings[keyof Settings]
  // ) => void;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
} | null>(null);

// This hook can be used to access app settings
export function useSettings() {
  const value = useContext(SettingsContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAccount must be wrapped in a <AccountProvider />");
    }
  }

  return value;
}

// Type definitions for props
interface SettingsProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

export default function SettingsProvider({ children }: SettingsProviderProps) {
  const systemTheme = _useColorScheme() as NonNullable<ColorSchemeName>;

  const [settings, setSettings] = useState<Settings>({
    sync: "off",
    privacy: "off",
    theme: "system",
    currency: "Native",
    language: "English",
  });

  // const updateSettings = async (
  //   key: keyof Settings,
  //   value: Settings[keyof Settings]
  // ) => {
  //   setSettings({ ...settings, [key]: value });
  //   await AsyncStorage.setItem(
  //     "settings",
  //     JSON.stringify({ ...settings, [key]: value })
  //   );
  // };

  // Theme
  const [[, theme]] = useStorageState("theme");
  const isDark = useMemo(() => {
    if (theme === "system") return systemTheme === "dark";
    if (theme === "light") return false;
    return true;
  }, [settings.theme]);

  return (
    <SettingsContext.Provider
      value={{
        isDark,
        settings,
        setSettings,
        // updateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
