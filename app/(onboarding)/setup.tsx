import styles from "./onboarding.styles";
import { Check } from "lucide-react-native";
import Toast from "react-native-toast-message";
import { Container } from "components/_ui/custom";
import useColorScheme from "hooks/useColorScheme";
import { Fragment, useEffect, useState } from "react";
import { useAccount } from "providers/AccountProvider";
import SelectAvatars from "components/onboarding/selectAvatars";
import { InputRg, RgText, Text } from "components/_ui/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";

const AccountSetup = () => {
  const insets = useSafeAreaInsets();
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const grey = isDark ? "#ddd" : "#333";
  const label = isDark ? "#999" : "#777";
  const invert = isDark ? "#fff" : "#000";
  const border = isDark ? "#444" : "#888";
  const border2 = isDark ? "#888" : "#aaa";
  const accent = isDark ? "#1b1b1b" : "#eee";

  const [selectedAvatar, setSelectedAvatar] = useState<string>("");

  const {
    acctANS,
    prepareUser,
    isCreatingAccount,

    bio,
    setBio,
    username,
    setUsername,
    useDomainName,
    setUseDomainName,
  } = useAccount();

  useEffect(() => {
    setUseDomainName(!username && !!acctANS);
  }, [username]);

  return (
    <Container
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom + 30,
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          bounces={false}
          style={{
            flex: 1,
            width: "100%",
          }}
          keyboardShouldPersistTaps="never"
        >
          <View style={[styles.header]}>
            <Text style={[styles.headerTitle]}>Let’s get started!</Text>
            <RgText
              style={[
                {
                  color: grey,
                  fontSize: 14,
                },
              ]}
            >
              Choose a name and avatar that matches your vibe
            </RgText>
          </View>

          <SelectAvatars setSelectedAvatar={setSelectedAvatar} />

          <View style={[styles.usernameContainer]}>
            {acctANS && (
              <Fragment>
                <View
                  style={[
                    styles.domainNameToggle,
                    {
                      borderRadius: 10,
                      backgroundColor: accent,
                    },
                  ]}
                >
                  <View
                    style={{
                      gap: 4,
                      flex: 1,
                      flexDirection: "column",
                    }}
                  >
                    <RgText
                      style={[
                        {
                          color: label,
                        },
                      ]}
                    >
                      Use your ANS (recommended)
                    </RgText>
                    <RgText
                      style={[
                        {
                          fontSize: 16,
                        },
                      ]}
                    >
                      {acctANS + ".algo"}
                    </RgText>
                  </View>

                  <TouchableOpacity
                    style={{
                      width: 20,
                      height: 20,
                      paddingTop: 1,
                      borderRadius: 30,
                      borderColor: border2,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: useDomainName ? 0 : 1,
                      backgroundColor: useDomainName
                        ? "#419B45"
                        : isDark
                        ? "#222"
                        : "#fff",
                    }}
                    onPress={() => {
                      if (useDomainName) {
                        setUseDomainName(false);
                      } else {
                        setUsername("");
                        setUseDomainName(true);
                      }
                    }}
                  >
                    {useDomainName ? (
                      <Check size={13} color={"#fff"} strokeWidth={3} />
                    ) : null}
                  </TouchableOpacity>
                </View>
              </Fragment>
            )}

            <Fragment>
              <RgText
                style={[
                  styles.headerSubtitle,
                  {
                    color: grey,
                    fontSize: 14,
                    marginTop: 10,
                    paddingHorizontal: 6,
                  },
                ]}
              >
                {acctANS ? "Or e" : "E"}nter your unique username
              </RgText>

              <View
                style={[
                  styles.inputContainer,
                  {
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingVertical: 12,
                    borderColor: border,
                  },
                ]}
              >
                <InputRg
                  value={username}
                  keyboardType="default"
                  editable={!isCreatingAccount}
                  onChangeText={(text) => setUsername(text)}
                  style={[
                    styles.input,
                    {
                      fontSize: 16,
                    },
                  ]}
                  placeholder="Eg: Normany, Rissa✨"
                  placeholderTextColor={isDark ? "#999" : "#666"}
                />
              </View>
            </Fragment>

            <Fragment>
              <RgText
                style={[
                  styles.headerSubtitle,
                  {
                    color: grey,
                    fontSize: 14,
                    marginTop: 14,
                    paddingHorizontal: 6,
                  },
                ]}
              >
                Add a bio (optional)
              </RgText>

              <View style={[styles.userbio]}>
                <InputRg
                  multiline
                  value={bio}
                  maxLength={200}
                  numberOfLines={5}
                  keyboardType="twitter"
                  editable={!isCreatingAccount}
                  onChangeText={(text) => setBio(text)}
                  placeholder="Write something about yourself"
                  style={[
                    styles.bioInput,
                    {
                      fontSize: 16,
                      borderRadius: 10,
                      color: isDark ? "#fff" : "#000",
                      backgroundColor: isDark ? "#151515" : "#f1f1f1",
                    },
                  ]}
                  placeholderTextColor={isDark ? "#999" : "#555"}
                />
              </View>
            </Fragment>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View
        style={{
          width: "100%",
          alignItems: "center",
          paddingHorizontal: 16,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          disabled={isCreatingAccount}
          onPress={() => {
            if (username.trim().length < 3 || username.includes(".sol")) {
              Toast.show({
                type: "error",
                text1: "Invalid username",
                text2:
                  "Username must be 3-20 characters long and cannot include '.sol'.",
                topOffset: insets.top + 10,
              });
            } else {
              prepareUser({
                bio,
                image_url: selectedAvatar,
                moniker: (useDomainName && acctANS
                  ? acctANS
                  : username
                )?.toLowerCase(),
              });
            }
          }}
          style={[
            styles.continueBtn,
            {
              opacity:
                username.trim().length < 3 || username.trim().length > 20
                  ? 10.7
                  : 1,
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
            Continue
          </Text>

          {isCreatingAccount && (
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
  );
};

export default AccountSetup;
