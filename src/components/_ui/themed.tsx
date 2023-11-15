import { useCallback } from "react";
import {
  Platform,
  StyleProp,
  PressableProps,
  ScrollViewProps,
  Text as DefaultText,
  View as DefaultView,
  TouchableOpacityProps,
  TextInput as DefaultInput,
  KeyboardAvoidingViewProps,
  Pressable as DefaultPressable,
  ScrollView as DefaultScrollView,
  TouchableOpacity as DefaultTouchableOpacity,
  KeyboardAvoidingView as DefaultKeyboardAvoidingView,
} from "react-native";
import {
  SafeAreaViewProps,
  SafeAreaView as DefaultSafeAreaView,
} from "react-native-safe-area-context";
import Colors from "constants/colors";
import useColorScheme from "hooks/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  grey?: boolean;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type CustomPressableProps = ThemeProps &
  PressableProps & {
    activeOpacity?: number;
  };
export type CustomTouchableOpacityProps = ThemeProps &
  TouchableOpacityProps & {
    activeOpacity?: number;
  };
export type ViewProps = ThemeProps &
  DefaultView["props"] & {
    accent?: boolean;
    transparent?: boolean;
    ref?: React.Ref<DefaultView>;
  };
export type InputProps = { color?: string } & DefaultInput["props"];

export function NormalText(props: TextProps) {
  const { style, lightColor, darkColor, grey, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    grey ? "grey" : "text"
  );

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function TextInput(props: InputProps) {
  const theme = useColorScheme();
  const { style, color, placeholderTextColor, ...otherProps } = props;

  const textColor = useThemeColor({ light: color, dark: color }, "text");
  const placeholderColor = Colors[theme].grey;

  return (
    <DefaultInput
      style={[
        {
          color: textColor,
        },
        style,
      ]}
      placeholderTextColor={placeholderTextColor ?? placeholderColor}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const {
    style,
    accent,
    transparent = true,
    lightColor,
    darkColor,
    ...otherProps
  } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    accent ? "accent" : "background"
  );

  return (
    <DefaultView
      style={[
        {
          backgroundColor:
            transparent && !accent ? "transparent" : backgroundColor,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function TouchableOpacity(props: CustomTouchableOpacityProps) {
  const {
    style,
    lightColor,
    darkColor,
    activeOpacity = 0.7,
    ...otherProps
  } = props;

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultTouchableOpacity
      activeOpacity={activeOpacity}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}

export function Pressable(props: CustomPressableProps) {
  const {
    style,
    lightColor,
    darkColor,
    activeOpacity = 0.7,
    ...otherProps
  } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultPressable
      // @ts-ignore
      style={useCallback(
        ({ pressed }: { pressed: boolean }) => [
          { opacity: pressed ? activeOpacity : 1 },
          { backgroundColor },
          style as StyleProp<PressableProps>,
        ],
        [style, activeOpacity, backgroundColor]
      )}
      {...otherProps}
    />
  );
}

export function SafeAreaView(props: SafeAreaViewProps & ThemeProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultSafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}

export function ScrollView(props: ScrollViewProps & ThemeProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}

export function KeyboardAvoidingView(
  props: KeyboardAvoidingViewProps & ThemeProps
) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultKeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}
