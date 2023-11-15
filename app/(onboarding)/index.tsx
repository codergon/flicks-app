import { Fragment, useEffect, useState } from "react";
import { Image } from "expo-image";
import Br from "components/_common/Br";
import styles from "./onboarding.styles";
import useColorScheme from "hooks/useColorScheme";
import { Container } from "components/_ui/custom";
import { useAccount } from "providers/AccountProvider";
import { RgText, Text } from "components/_ui/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";

const Onboarding = () => {
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === "dark";
  const invert = isDark ? "#fff" : "#000";
  const description = isDark ? "#ccc" : "#676C75";

  const { authorizationInProgress, connect, isCheckingUser, isFetchingSNS } =
    useAccount();

  return (
    <Fragment>
      {/* <AppStatusBar backgroundColor="#000" barStyle="light-content" /> */}

      <Container
        style={{
          gap: 50,
          paddingTop: insets.top + 40,
          paddingBottom: insets.bottom + 30,
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          <Image
            contentFit="cover"
            style={{ width: "100%", height: "100%" }}
            source={require("assets/images/onboarding.png")}
          />
        </View>

        <View
          style={{
            gap: 44,
            width: "100%",
            paddingHorizontal: 16,
          }}
        >
          <View
            style={{
              gap: 10,
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                fontSize: 28,
                textAlign: "center",
              }}
            >
              Discover. Stream. Connect
            </Text>
            <RgText
              style={{
                fontSize: 15,
                lineHeight: 21,
                color: description,
                textAlign: "center",
              }}
            >
              Explore live streams, connect with your favorite <Br /> creators,
              and become a part of our thriving
              <Br /> community
            </RgText>
          </View>

          <TouchableOpacity
            onPress={connect}
            disabled={authorizationInProgress || isFetchingSNS}
            style={[
              styles.continueBtn,
              {
                backgroundColor: invert,
              },
            ]}
          >
            <Text
              lightColor="#fff"
              darkColor="#000"
              style={{
                fontSize: 16,
              }}
            >
              {isFetchingSNS
                ? "Fetching SNS..."
                : isCheckingUser
                ? "Authenticating account"
                : authorizationInProgress
                ? "Connecting Wallet"
                : "Connect Wallet"}
            </Text>

            {(isFetchingSNS || isCheckingUser || authorizationInProgress) && (
              <ActivityIndicator
                size={"small"}
                style={{
                  right: 16,
                  position: "absolute",
                }}
                color={isDark ? "#000" : "#fff"}
              />
            )}
          </TouchableOpacity>
        </View>
      </Container>
    </Fragment>
  );
};

export default Onboarding;
