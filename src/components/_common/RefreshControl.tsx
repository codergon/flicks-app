import {
  StyleSheet,
  RefreshControlProps,
  RefreshControl as RefreshControlRN,
} from "react-native";
import React from "react";
import useColorScheme from "hooks/useColorScheme";

const RefreshControl = (props: RefreshControlProps) => {
  const isDark = useColorScheme() === "dark";
  return <RefreshControlRN {...props} tintColor={isDark ? "#ccc" : "#666"} />;
};

export default RefreshControl;

const styles = StyleSheet.create({});
