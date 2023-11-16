import { Image } from "expo-image";
import Br from "components/_common/Br";
import styles from "./onboarding.styles";
import { Fragment, useState } from "react";
import { mnemonicToSecretKey } from "algosdk";
import useColorScheme from "hooks/useColorScheme";
import { useAccount } from "providers/AccountProvider";
import { RgText, Text } from "components/_ui/typography";
import AppStatusBar from "components/_common/AppStatusbar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const Onboarding = () => {
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === "dark";
  const invert = isDark ? "#fff" : "#000";
  const description = isDark ? "#ccc" : "#676C75";

  const [warning, setWarning] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const {
    connectWallet,
    isCheckingUser,
    isFetchingANS,
    authorizationInProgress,
  } = useAccount();

  async function handleConnectWallet() {
    let addr: string = "";
    try {
      const mnemonic =
        "venture limb caution dolphin deal elegant aware faculty raw twist trumpet travel flame body sunset border fluid truth climb engage faint enrich risk abstract renew";

      const res = mnemonicToSecretKey(mnemonic);
      addr = res.addr;
      setWarning("");
    } catch (e) {
      setWarning("Invalid mnemonic phrase supplied. Please try again.");
      return;
    }

    if (addr) connectWallet(addr);
  }

  return (
    <Fragment>
      {/* <AppStatusBar backgroundColor="#000" barStyle="light-content" /> */}

      <KeyboardAwareScrollView
        contentContainerStyle={{
          gap: 50,
          flex: 1,
          paddingTop: insets.top + 40,
          paddingBottom: insets.bottom + 30,
        }}
      >
        <View
          style={{
            flex: 1,
            // height: 500,
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
            width: "100%",
            paddingHorizontal: 16,
          }}
        >
          <View
            style={{
              gap: 10,
              marginBottom: 44,
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

          <View style={{ flexDirection: "column" }}>
            {warning && (
              <Text
                style={{
                  fontSize: 12,
                  marginBottom: 10,
                  color: "#ed693d",
                  textAlign: "center",
                }}
              >
                {warning}
              </Text>
            )}

            <View
              style={[
                {
                  gap: 24,
                  minHeight: 50,
                  borderWidth: 1,
                  borderRadius: 14,
                  marginBottom: 20,
                  paddingVertical: 4,
                  flexDirection: "row",
                  alignItems: "center",
                  borderColor: "#d8d8d8",
                  justifyContent: "space-between",
                },
              ]}
            >
              <TextInput
                multiline
                numberOfLines={2}
                value={privateKey}
                keyboardType="default"
                onChangeText={(text) => setPrivateKey(text)}
                style={[
                  {
                    flex: 1,
                    fontSize: 15,
                    color: "#000",
                    height: "100%",
                    lineHeight: 24,
                    paddingHorizontal: 14,
                    fontFamily: "DMSans-Regular",
                  },
                ]}
                placeholderTextColor={"#444"}
                placeholder="Enter your mnemonic phrase here..."
              />
            </View>

            <TouchableOpacity
              onPress={handleConnectWallet}
              disabled={authorizationInProgress || isFetchingANS}
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
                {isFetchingANS
                  ? "Fetching ANS..."
                  : isCheckingUser
                  ? "Authenticating account"
                  : authorizationInProgress
                  ? "Connecting Wallet"
                  : "Connect Wallet"}
              </Text>

              {(isFetchingANS || isCheckingUser || authorizationInProgress) && (
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
        </View>
      </KeyboardAwareScrollView>
    </Fragment>
  );
};

export default Onboarding;
