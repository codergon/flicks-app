import { Image } from "expo-image";
import styles from "./account.styles";
import { padding } from "helpers/styles";
import { useCallback, useState } from "react";
import { primaryColor } from "constants/colors";
import { RefreshCcw } from "lucide-react-native";
import { Pencil, Share } from "lucide-react-native";
import { router, useFocusEffect } from "expo-router";
import { useModals } from "providers/ModalsProvider";
import { RgText, Text } from "components/_ui/typography";
import { useNetInfo } from "@react-native-community/netinfo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Tabs, MaterialTabBar } from "react-native-collapsible-tab-view";
import { EyeSlash, PaperPlane, ArrowFatLineDown } from "phosphor-react-native";
import {
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import AccountPostsTab from "./_tabs/posts";
import AccountStreams from "./_tabs/streams";
import AccountMediaTab from "./_tabs/gallery";
import AccountWishlist from "./_tabs/wishlist";
import AccountTransactons from "./_tabs/transactions";
import { useAccount } from "providers/AccountProvider";
import AccountHeaderBtns from "components/account/header";

const UserAccountHeader = () => {
  const netInfo = useNetInfo();
  const insets = useSafeAreaInsets();
  const { userData, fetchUserData, isRefetchingUser } = useAccount();
  const [hideBalance, setHideBalance] = useState(false);

  const {
    openWithdrawalModal,
    openUpdateAccountModal,
    openDepositAddressesModal,
  } = useModals();

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.profileHeader,
        {
          marginTop: -insets.top,
        },
      ]}
    >
      {/* <AccountHeaderBtns /> */}

      <View
        pointerEvents="none"
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
          source={{ uri: userData?.banner_url }}
        />
      </View>

      <View style={styles.userDetails}>
        <View
          pointerEvents="none"
          style={[
            styles.avatar,
            {
              borderWidth: 3,
              marginTop: -14,
              borderColor: "#fff",
              position: "relative",
            },
          ]}
        >
          <Image
            transition={300}
            contentFit="cover"
            style={[styles.avatar_image]}
            source={{ uri: userData?.image_url }}
          />

          <View
            style={{
              bottom: 1,
              right: 2,
              width: 14,
              height: 14,
              borderWidth: 2,
              borderRadius: 10,
              borderColor: "#eee",
              position: "absolute",
              backgroundColor: netInfo?.isConnected ? "#28a745" : "#aaa",
            }}
          />
        </View>

        <View style={[styles.info_actions]}>
          <View style={[styles.creatorInfo]}>
            <View
              style={{
                gap: 5,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={[styles.creatorInfo__name]}>
                {userData?.moniker}
              </Text>
            </View>

            <View
              style={{
                gap: 7,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <RgText style={[styles.creatorInfo__desc, { color: "#676C75" }]}>
                {/* {shortenAddress(userData?.address || "")} */}
                {`${
                  userData?.subscribers_count &&
                  !isNaN(userData?.subscribers_count) &&
                  Number(userData?.subscribers_count) > 0
                    ? userData?.subscribers_count
                    : 0
                } subscriber${
                  (userData?.subscribers_count &&
                  !isNaN(userData?.subscribers_count) &&
                  Number(userData?.subscribers_count) > 0
                    ? userData?.subscribers_count
                    : 0) > 1
                    ? "s"
                    : ""
                }`}{" "}
                {`• ${
                  userData?.contents_count &&
                  !isNaN(userData?.contents_count) &&
                  Number(userData?.contents_count) > 0
                    ? userData?.contents_count
                    : 0
                } contents`}
              </RgText>
            </View>
          </View>

          <View style={[styles.actionBtns]}>
            <TouchableOpacity
              style={[styles.actionBtn]}
              onPress={openUpdateAccountModal}
            >
              <Pencil size={16} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn]}
              onPress={() => {
                router.push("/shareQR/");
              }}
            >
              <Share size={16} strokeWidth={2.2} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {userData?.bio && (
        <View pointerEvents="none" style={[styles.bio]}>
          <RgText>{userData?.bio}</RgText>
        </View>
      )}

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
                  {hideBalance
                    ? "*****"
                    : "$" +
                      (userData?.wallet?.balance &&
                      !isNaN(Number(userData?.wallet?.balance)) &&
                      Number(userData?.wallet?.balance) > 0
                        ? userData?.wallet?.balance
                        : "0.00")}
                </Text>

                <TouchableOpacity
                  style={{ ...padding(4, 2) }}
                  onPressIn={() => {
                    setHideBalance((p) => !p);
                  }}
                >
                  <EyeSlash size={18} color="#000" weight="fill" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ ...padding(4, 4) }}
                  onPressIn={() => {
                    fetchUserData(true);
                  }}
                >
                  {!isRefetchingUser ? (
                    <RefreshCcw size={15} color="#000" strokeWidth={2.3} />
                  ) : (
                    <ActivityIndicator
                      color={"#000"}
                      size={"small"}
                      style={{
                        height: 15,
                        transform: [
                          {
                            scale: 0.7,
                          },
                        ],
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={[styles.stats_group]}>
            {[
              {
                label: "Deposit",
                onPress: openDepositAddressesModal,
                icon: <ArrowFatLineDown size={14} color="#000" weight="bold" />,
              },
              {
                label: "Withdraw",
                onPress: openWithdrawalModal,
                icon: <PaperPlane size={14} color="#000" weight="bold" />,
              },
            ].map((item, index) => {
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
                    onPress={() => {
                      item?.onPress?.();
                    }}
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

        <View pointerEvents="none" style={[styles.stats_row]}>
          <View
            style={{
              gap: 32,
              width: "100%",
              flexDirection: "row",
              // justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <RgText style={[{ fontSize: 15, color: "#444" }]}>
                Subscription:{" "}
              </RgText>
              <Text style={{ paddingTop: 3 }}>
                {userData?.subscription_type === "free"
                  ? "Free"
                  : userData?.subscription_type === "monetary"
                  ? `$${userData?.subscription_info?.amount ?? "0.00"}/mo`
                  : ``}
              </Text>

              {userData?.subscription_type === "nft" && (
                <View style={[styles.nftSubscription]}>
                  <View style={[styles.nftImage]}>
                    <Image
                      transition={300}
                      contentFit="cover"
                      style={[styles.nftImage_img]}
                      source={{
                        uri: userData?.subscription_info?.collection_image,
                      }}
                    />
                  </View>
                  <Text style={{ fontSize: 14.5 }}>
                    {userData?.subscription_info?.collection_name}
                    <RgText style={{ fontSize: 13, color: "#666" }}>
                      {" "}
                      {"(NFT Pass)"}
                    </RgText>
                  </Text>
                </View>
              )}
            </View>
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
        renderHeader={UserAccountHeader}
        renderTabBar={(props) => (
          <MaterialTabBar
            {...props}
            inactiveColor="#555"
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
      >
        <Tabs.Tab name="Posts">
          <AccountPostsTab />
        </Tabs.Tab>
        <Tabs.Tab name="Media">
          <AccountMediaTab />
        </Tabs.Tab>
        <Tabs.Tab name="Transactions">
          <AccountTransactons />
        </Tabs.Tab>
        <Tabs.Tab name="Streams">
          <AccountStreams />
        </Tabs.Tab>
        <Tabs.Tab name="Wishlist">
          <AccountWishlist />
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  );
};

export default UserAccount;
