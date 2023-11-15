import { Stack } from "expo-router";
import AppToast from "components/_common/appToast";

const LivestreamLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <AppToast />
    </>
  );
};
export default LivestreamLayout;
