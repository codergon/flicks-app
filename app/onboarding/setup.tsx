import Layout from "constants/Layout";
import styles from "./onboarding.styles";
import { Check } from "lucide-react-native";
import { Container } from "components/_ui/custom";
import { Fragment, useRef, useState } from "react";
import { InputRg, RgText, Text } from "components/_ui/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  Animated,
  FlatList,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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

  const scrollX = useRef(new Animated.Value(0)).current;
  const width = Layout.window.width;
  const ITEM_SIZE = 78;
  // const ITEM_SIZE = width * 0.38;
  const ITEM_SPACING = (width - ITEM_SIZE) / 2;

  const [username, setUsername] = useState("");
  const [domainName, setDomainName] = useState("");
  const [useDomainName, setUseDomainName] = useState(true);

  const avatars = Array.from({ length: 20 });

  return (
    <Fragment>
      {/* <AppStatusBar backgroundColor="#000" barStyle="light-content" /> */}

      <Container
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 30,
        }}
      >
        <KeyboardAwareScrollView
          bounces={false}
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          <View style={[styles.header]}>
            <Text style={[styles.headerTitle]}>
              {/* Welcome to Flicks! */}
              Let’s get started!
            </Text>
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

          <View style={[styles.avatarsContainer]}>
            <FlatList
              horizontal
              pagingEnabled
              bounces={false}
              centerContent={true}
              disableIntervalMomentum
              onMomentumScrollEnd={(event) => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.x / ITEM_SIZE
                );
                console.log(index);
              }}
              decelerationRate="fast"
              style={{ flexGrow: 0 }}
              scrollEventThrottle={16}
              initialScrollIndex={avatars.length / 2}
              onScroll={(event) => {
                Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false }
                )(event);
              }}
              data={avatars}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              snapToInterval={ITEM_SIZE}
              contentContainerStyle={{
                alignItems: "center",
                paddingHorizontal: ITEM_SPACING,
              }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                const inputRange = [
                  (index - 3) * ITEM_SIZE,
                  (index - 2) * ITEM_SIZE,
                  (index - 1) * ITEM_SIZE,
                  index * ITEM_SIZE,
                  (index + 1) * ITEM_SIZE,
                  (index + 2) * ITEM_SIZE,
                  (index + 3) * ITEM_SIZE,
                ];

                const scale = scrollX.interpolate({
                  inputRange,
                  outputRange: [0.52, 0.62, 0.76, 1, 0.76, 0.62, 0.52],
                });

                const mr1 = 4;
                const mr2 = 34;
                const mr3 = 92;
                const mr4 = 192;

                const marginRight = scrollX.interpolate({
                  inputRange: [
                    (index - 4) * ITEM_SIZE,
                    ...inputRange,
                    (index + 4) * ITEM_SIZE,
                  ],
                  outputRange: [-mr4, -mr3, -mr2, -mr1, 0, mr1, mr2, mr3, mr4],
                  extrapolate: "clamp",
                });

                return (
                  <Animated.View
                    style={{
                      width: ITEM_SIZE,
                      height: ITEM_SIZE,
                      borderRadius: 100,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Animated.Image
                      style={[
                        {
                          width: "100%",
                          height: "100%",
                          borderRadius: 100,
                          resizeMode: "cover",
                          backgroundColor: "#222",

                          transform: [
                            {
                              scale: scale,
                            },
                            {
                              translateX: marginRight,
                            },
                          ],
                        },
                      ]}
                      source={require("assets/images/mock/5.png")}
                    />
                  </Animated.View>
                );
              }}
            />
          </View>

          <View style={[styles.usernameContainer]}>
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
                  Use your domain name
                </RgText>
                <RgText
                  style={[
                    {
                      fontSize: 16,
                    },
                  ]}
                >
                  Anthrax.sol
                </RgText>
              </View>

              <TouchableOpacity
                style={{
                  width: 24,
                  height: 24,
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
                onPress={() => setUseDomainName((p) => !p)}
              >
                {useDomainName ? (
                  <Check size={16} color={"#fff"} strokeWidth={2.6} />
                ) : null}
              </TouchableOpacity>
            </View>

            <RgText
              style={[
                styles.headerSubtitle,
                {
                  color: grey,
                  fontSize: 14,
                  marginTop: 10,
                  paddingHorizontal: 6,
                  // textAlign: "center",
                },
              ]}
            >
              Or enter your unique username
            </RgText>
            <View
              style={[
                styles.inputContainer,
                {
                  height: 52,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: border,
                },
              ]}
            >
              <InputRg
                value={username}
                onChangeText={(text) => setUsername(text)}
                keyboardType="numeric"
                style={[
                  styles.input,
                  {
                    fontSize: 16,
                  },
                ]}
                placeholderTextColor={isDark ? "#999" : "#666"}
                placeholder="Eg: Normany, Rissa✨"
              />
            </View>
          </View>
        </KeyboardAwareScrollView>

        <View
          style={{
            width: "100%",
            alignItems: "center",
            paddingHorizontal: 16,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
      </Container>
    </Fragment>
  );
};

export default AccountSetup;
