import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="topCreators" />
      <Stack.Screen name="suggestedAccounts" />
    </Stack>
  );
};

export default HomeLayout;
