import { Stack } from "expo-router";
import AppToast from "components/_common/appToast";

const UploadLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <AppToast />
    </>
  );
};
export default UploadLayout;
