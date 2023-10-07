import { Image } from "expo-image";
import styles from "./account.styles";
import { padding } from "helpers/styles";
import { Pencil } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Tabs, MaterialTabBar } from "react-native-collapsible-tab-view";
import { RgText, Text } from "components/_ui/typography";
import AccountHeaderBtns from "components/account/header";
import { View, StatusBar, TouchableOpacity } from "react-native";
import { EyeSlash, PaperPlane, ArrowFatLineDown } from "phosphor-react-native";

import AccountPostsTab from "./_tabs/posts";
import AccountMediaTab from "./_tabs/gallery";
import AccountWishlist from "./_tabs/wishlist";
import AccountUpcomingStreams from "./_tabs/upcoming";
import AccountTransactons from "./_tabs/AccountTransactions";
import { useFocusEffect } from "expo-router";
import { primaryColor } from "constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const UserAccountHeader = () => {
  const insets = useSafeAreaInsets();
  const [hideBalance, setHideBalance] = useState(false);

  return (
    <View
      style={[
        styles.profileHeader,
        {
          marginTop: -insets.top,
        },
      ]}
    >
      <AccountHeaderBtns />
      <View
        style={[
          styles.banner,
          {
            backgroundColor: "#f4f4f4",
          },
        ]}
      >
        <Image
          transition={300}
          contentFit="cover"
          style={[styles.bannerImg]}
          source={require("assets/images/mock/18.png")}
        />
      </View>

      <View style={styles.userDetails}>
        <View
          style={[
            styles.avatar,
            {
              borderWidth: 3,
              marginTop: -14,
              borderColor: "#fff",
            },
          ]}
        >
          <Image
            transition={300}
            contentFit="cover"
            style={[styles.avatar_image]}
            source={require("assets/images/mock/19.png")}
          />
        </View>

        <View style={[styles.info_actions]}>
          <View style={[styles.creatorInfo]}>
            <Text style={[styles.creatorInfo__name]}>Alisha Marie 🌈</Text>
            <RgText style={[styles.creatorInfo__desc, { color: "#676C75" }]}>
              436 subscribers • 32 contents
            </RgText>
          </View>

          <View style={[styles.actionBtns]}>
            <TouchableOpacity style={[styles.actionBtn]}>
              <Pencil size={16} color="#000" />
              {/* <Gear size={20} color="#000" weight="regular" /> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={[styles.bio]}>
        <RgText>
          Really outer space! It’s crazy how all fits outer space 🌌🌍
        </RgText>
      </View>

      <View style={[styles.accountStats]}>
        <View style={[styles.stats_row]}>
          <View style={[styles.stats_group]}>
            <View style={[styles.statBtn_cover]}>
              <RgText style={[{ fontSize: 13, color: "#444" }]}>
                Total Balance
              </RgText>

              <View
                style={[
                  styles.statBtn,
                  {
                    gap: 4,
                    paddingHorizontal: 0,
                    width: "auto",
                    borderRadius: 0,
                    flexDirection: "row",
                    backgroundColor: "transparent",
                  },
                ]}
              >
                <Text
                  style={[
                    {
                      color: "#000",
                      marginBottom: hideBalance ? -11 : 0,
                      fontSize: hideBalance ? 34 : 18,
                    },
                  ]}
                >
                  {hideBalance ? "*****" : "$1,287.89"}
                </Text>

                <TouchableOpacity
                  style={{ ...padding(4, 2) }}
                  onPressIn={() => {
                    setHideBalance((p) => !p);
                  }}
                >
                  <EyeSlash size={17} color="#000" weight="fill" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={[styles.stats_group]}>
            {[
              {
                label: "Deposit",
                icon: <ArrowFatLineDown size={14} color="#000" weight="bold" />,
              },
              {
                label: "Withdraw",
                icon: <PaperPlane size={14} color="#000" weight="bold" />,
              },
            ].map((item, index) => {
              const darkBg = ["Deposit", "Withdraw"].includes(item?.label);
              return (
                <View key={index} style={[styles.statBtn_cover]}>
                  <TouchableOpacity
                    style={[
                      styles.statBtn,
                      {
                        borderWidth: 1,
                        borderColor: "#ccc",
                      },
                    ]}
                  >
                    {item?.icon}
                    <Text style={[{ fontSize: 12, color: "#000" }]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        <View style={[styles.stats_row]}>
          <View
            style={{
              gap: 32,
              width: "100%",
              flexDirection: "row",
              // justifyContent: "space-between",
            }}
          >
            <RgText style={[{ fontSize: 14, color: "#444" }]}>
              {/* Account type: */}
              <Text>Paid Account</Text>
            </RgText>

            <RgText style={[{ fontSize: 14, color: "#444" }]}>
              Subscription: <Text>$9.99/mo</Text>
            </RgText>
          </View>
        </View>
      </View>
    </View>
  );
};

const UserAccount = () => {
  const insets = useSafeAreaInsets();
  useFocusEffect(
    useCallback(() => {
      // Change status bar color
      StatusBar.setBarStyle("light-content");
    }, [])
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: "#fff",
        },
      ]}
    >
      <Tabs.Container
        lazy
        tabBarHeight={70}
        snapThreshold={0.5}
        // @ts-ignore
        headerContainerStyle={{
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
        }}
        containerStyle={{
          top: insets.top + 0,
        }}
        renderTabBar={(props) => (
          <MaterialTabBar
            {...props}
            inactiveColor="#7b7b7b"
            scrollEnabled
            indicatorStyle={{
              height: 2,
              backgroundColor: primaryColor,
            }}
            tabStyle={{
              width: "auto",
              paddingHorizontal: 10,
            }}
            labelStyle={{
              fontSize: 14,
              textTransform: "capitalize",
              fontFamily: "DMSans-Medium",
            }}
            contentContainerStyle={{ gap: 16 }}
            style={{
              height: 46,

              // top: insets.top - 2,

              borderBottomWidth: 1,
              backgroundColor: "#fff",
              borderBottomColor: "#f4f4f4",
            }}
          />
        )}
        renderHeader={UserAccountHeader}
      >
        <Tabs.Tab name="Posts">
          <AccountPostsTab />
        </Tabs.Tab>
        <Tabs.Tab name="Media">
          <AccountMediaTab />
        </Tabs.Tab>
        <Tabs.Tab name="Upcoming">
          <AccountUpcomingStreams />
        </Tabs.Tab>
        <Tabs.Tab name="Transactions">
          <AccountTransactons />
        </Tabs.Tab>
        <Tabs.Tab name="Wishlist">
          <AccountWishlist />
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  );
};

export default UserAccount;
