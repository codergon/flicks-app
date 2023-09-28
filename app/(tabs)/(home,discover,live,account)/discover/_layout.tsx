import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

const DiscoverLayout = () => {
  return (
    <Stack
      key="discover"
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default DiscoverLayout;
