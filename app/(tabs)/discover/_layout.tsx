import { Stack } from "expo-router";

const DiscoverLayout = () => {
  return (
    <Stack
      key="discover"
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default DiscoverLayout;
