import { StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "components/ui/typography";
import { Slot } from "expo-router";

const HomeLayout = () => {
  return (
    <View>
      <Text>HomeLayout</Text>
      <Slot />
    </View>
  );
};

export default HomeLayout;

const styles = StyleSheet.create({});
