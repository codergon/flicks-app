import axios from "axios";
import { Image } from "expo-image";
import styles from "./profile.styles";
import { padding } from "helpers/styles";
import { Check, Copy } from "lucide-react-native";
import { useCallback, useState } from "react";
import { primaryColor } from "constants/colors";
import { RgText, Text } from "components/_ui/typography";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Tabs, MaterialTabBar } from "react-native-collapsible-tab-view";
import {
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import ProfilePostsTab from "./_tabs/posts";
import ProfileMediaTab from "./_tabs/gallery";
import ProfileWishlist from "./_tabs/wishlist";
import ProfileUpcomingStreams from "./_tabs/upcoming";

import Layout from "constants/layout";
import { Creator } from "typings/user";
import useClipboard from "hooks/useClipboard";
import Toast from "react-native-toast-message";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "components/_common/Skeleton";
import shortenAddress from "utils/shortenAddress";
import { ScrollView } from "components/_ui/themed";
import { useAccount } from "providers/AccountProvider";
import ProfileHeaderBtns from "components/profile/header";
import RefreshControl from "components/_common/RefreshControl";
import { schedulePushNotification } from "providers/AppProvider";

const UserProfileHeader = ({
  userData,
  refetch,
  offsetTop = true,
}: {
  refetch?: () => void;
  offsetTop?: boolean;
  userData: Creator | null;
}) => {
  const insets = useSafeAreaInsets();
  const [copied = false, copyToClipboard] = useClipboard();
  const { userData: currentUser, userSignature } = useAccount();

  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (shouldSubscribe: boolean) => {
    if (!userSignature) return;

    let success = false;

    try {
      setSubscribing(true);
      await axios.post(
        `/subscriptions/creators/${userData?.address}/subscribe`,
        undefined,
        {
          headers: {
            Authorization: `Signature ${userSignature?.publicKey}:${userSignature?.signature}`,
          },
        }
      );

      success = true;
      await refetch?.();
    } catch (e: any) {
      console.log(e?.response?.data?.message);

      Toast.show({
        type: "error",
        topOffset: insets.top + 10,
        text1: "Subscription failed",
        text2: "An error occured while subscribing to this creator",
      });
    } finally {
      setSubscribing(false);

      if (success) {
        await schedulePushNotification({
          title: "Subscription successful ✨",
          body: `You have successfully subscribed to ${userData?.moniker}`,
        });
      }
    }
  };

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.profileHeader,
        {
          marginTop: offsetTop ? -insets.top : 0,
        },
      ]}
    >
      <ProfileHeaderBtns />

      <View
        pointerEvents="none"
        style={[
          styles.banner,
          {
            backgroundColor: "#f4f4f4",
          },
        ]}
      >
        <Skeleton
          height={200}
          delay={3000}
          animationSpeed={4000}
          showContent={!!userData}
          width={Layout.window.width}
          style={{ borderRadius: 0 }}
        >
          <Image
            transition={300}
            contentFit="cover"
            style={[styles.bannerImg]}
            source={{ uri: userData?.banner_url }}
          />
        </Skeleton>
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
            },
          ]}
        >
          <Image
            transition={300}
            contentFit="cover"
            style={[styles.avatar_image]}
            source={{ uri: userData?.image_url }}
          />
        </View>

        <View style={[styles.info_actions]}>
          <View style={[styles.creatorInfo]}>
            <Skeleton showContent={!!userData}>
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

                <RgText
                  style={[styles.creatorInfo__desc, { color: "#676C75" }]}
                >
                  {"•  " + shortenAddress(userData?.address || "", 4)}
                </RgText>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ ...padding(4, 4) }}
                  onPress={() => {
                    if (userData?.address) copyToClipboard(userData?.address);
                  }}
                >
                  {copied ? (
                    <View
                      style={{
                        width: 15,
                        height: 15,
                        borderRadius: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#419B45",
                      }}
                    >
                      <Check size={12} color={"#fff"} strokeWidth={3} />
                    </View>
                  ) : (
                    <Copy size={12} strokeWidth={3} color={"#676C75"} />
                  )}
                </TouchableOpacity>
              </View>
            </Skeleton>

            <Skeleton showContent={!!userData}>
              <View
                style={{
                  gap: 7,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RgText
                  style={[styles.creatorInfo__desc, { color: "#676C75" }]}
                >
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
            </Skeleton>
          </View>
        </View>
      </View>

      {userData?.bio && (
        <View pointerEvents="none" style={[styles.bio]}>
          <RgText>{userData?.bio}</RgText>
        </View>
      )}

      <Skeleton
        showContent={!!userData}
        style={{
          ...(!userData && { marginTop: 16, marginHorizontal: 16 }),
        }}
        width={Layout.window.width - (userData ? 0 : 32)}
      >
        <View style={[styles.accountStats]}>
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
      </Skeleton>

      {!userData && (
        <Skeleton
          showContent={!!userData}
          style={{
            marginTop: 6,
            marginHorizontal: 16,
          }}
          width={Layout.window.width - 32}
        />
      )}

      {!!userData && userData?.address !== currentUser?.address && (
        <TouchableOpacity
          disabled={subscribing}
          onPress={() => {
            handleSubscribe(!!userData?.is_subscribed);
          }}
          style={[
            {
              marginTop: 4,
              marginBottom: 4,
              zIndex: 99,
              borderWidth: 1,
              borderRadius: 14,
              ...padding(10, 12),
              marginHorizontal: 16,
              alignItems: "center",
              paddingHorizontal: 16,
              justifyContent: "center",

              borderColor: userData?.is_subscribed ? "#ccc" : primaryColor,
              backgroundColor: userData?.is_subscribed
                ? "#transparent"
                : primaryColor,
            },
          ]}
        >
          <RgText
            style={{
              fontSize: 14,
              color: userData?.is_subscribed ? "#000" : "#fff",
            }}
          >
            Subscribe{userData?.is_subscribed ? "d" : ""}
          </RgText>

          {subscribing && (
            <ActivityIndicator
              size={"small"}
              style={{
                right: 16,
                position: "absolute",
              }}
              color={"#fff"}
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const UserProfile = () => {
  const { profile } = useLocalSearchParams();

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
    }, [])
  );

  const insets = useSafeAreaInsets();
  const { userSignature } = useAccount();

  const [refreshing, setRefreshing] = useState(false);

  const { data, refetch } = useQuery(
    ["profile", userSignature?.publicKey, profile],
    async () =>
      axios
        .get(`/creators/${profile}`, {
          headers: {
            Authorization: `Signature ${userSignature?.publicKey}:${userSignature?.signature}`,
          },
        })
        .then((res) => res.data?.data),
    {
      enabled: !!userSignature?.signature && !!profile,
    }
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: "#fff",
        },
      ]}
    >
      {!data?.is_subscribed ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <UserProfileHeader
            userData={data}
            offsetTop={false}
            refetch={refetch}
          />
        </ScrollView>
      ) : (
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
          renderHeader={() => <UserProfileHeader userData={data} />}
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
        >
          <Tabs.Tab name="Posts">
            <ProfilePostsTab profile={profile as string} />
          </Tabs.Tab>
          <Tabs.Tab name="Media">
            <ProfileMediaTab profile={profile as string} />
          </Tabs.Tab>
          <Tabs.Tab name="Upcoming">
            <ProfileUpcomingStreams />
          </Tabs.Tab>
          <Tabs.Tab name="Wishlist">
            <ProfileWishlist />
          </Tabs.Tab>
        </Tabs.Container>
      )}
    </View>
  );
};

export default UserProfile;
