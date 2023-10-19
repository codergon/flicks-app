import { Redirect, Stack } from "expo-router";
import Loader from "components/_common/Loader";
import { useAccount } from "providers/AccountProvider";

const OnboardingLayout = () => {
  const { userData, isAuthenticating, phantomWalletPublicKey } = useAccount();

  if (isAuthenticating) {
    return <Loader />;
  }

  if (!!userData) {
    return <Redirect href={`/(tabs)/(home)/home`} />;
    // return <Redirect href={`/scanQR/`} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: false }} />
  );
};
export default OnboardingLayout;
