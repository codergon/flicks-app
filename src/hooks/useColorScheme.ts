import {
  ColorSchemeName,
  useColorScheme as _useColorScheme,
} from "react-native";
import { useStorageState } from "./useStorageState";

export default function useColorScheme(): NonNullable<ColorSchemeName> {
  // const [[, theme]] = useStorageState("theme");
  // const systemTheme = _useColorScheme() as NonNullable<ColorSchemeName>;

  // if (!theme) return systemTheme;
  // if (theme === "system") return systemTheme;
  // if (theme === "light") return "light";
  // return "dark";

  return "light";
}
