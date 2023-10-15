import { View } from "components/_ui/themed";
import { Text } from "components/_ui/typography";
import { Redirect, Stack } from "expo-router";
import { useAccount } from "providers/AccountProvider";

const OnboardingLayout = () => {
  const { userData, isAuthenticating, phantomWalletPublicKey } = useAccount();

  if (isAuthenticating) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Flicks</Text>
      </View>
    );
  }

  if (userData) {
    return <Redirect href={`/(tabs)/(discover)/discover`} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: false }} />
  );
};
export default OnboardingLayout;
