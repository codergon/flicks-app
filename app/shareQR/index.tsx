import { useCallback, useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import Layout from "constants/Layout";
import { Check } from "lucide-react-native";
import QRCode from "react-native-qrcode-svg";
import useClipboard from "hooks/useClipboard";
import ViewShot from "react-native-view-shot";
import { Copy, X } from "lucide-react-native";
import { primaryColor } from "constants/Colors";
import shortenAddress from "utils/shortenAddress";
import { useAccount } from "providers/AccountProvider";
import { RgText, Text } from "components/_ui/typography";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as Sharing from "expo-sharing";

const ShareQR = () => {
  const viewShotRef = useRef<ViewShot | any>();
  const { userData } = useAccount();
  const insets = useSafeAreaInsets();
  const qrCodeWidth = Math.max(Layout.window.width * 0.52, 220);

  const [copied = false, copyToClipboard] = useClipboard();

  const handleShare = async () => {
    try {
      const res = await Sharing.isAvailableAsync();

      if (res) {
        viewShotRef?.current?.capture().then(async (uri: string) => {
          await Sharing.shareAsync(uri, {
            mimeType: "image/png",
            dialogTitle: "Share your Flicks profile",
            UTI: "image/png",
          });

          router.back();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: "flex-end",
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: "#fff",
            maxHeight: Layout.window.height - insets.top,
          },
        ]}
      >
        <View
          style={[
            styles.header,
            {
              backgroundColor: "#e8e8e8",
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.cancelBtn]}
            onPress={() => router.back()}
          >
            <X size={22} color={"#000"} strokeWidth={2.1} />
          </TouchableOpacity>
          <Text style={[styles.headerText]}>Share your profile</Text>
        </View>

        <View
          style={[
            styles.flexView,
            { paddingBottom: insets.bottom + 20, paddingHorizontal: 16 },
          ]}
        >
          <View
            style={[
              styles.flexView,
              { gap: 36, alignItems: "center", justifyContent: "center" },
            ]}
          >
            <ViewShot
              ref={viewShotRef}
              options={{
                quality: 0.9,
                format: "jpg",
                fileName: "flicks-profile " + userData?.address,
              }}
              style={{
                borderWidth: 1,
                aspectRatio: 1,
                borderRadius: 18,
                overflow: "hidden",
                width: qrCodeWidth,
                borderColor: "#ddd",
                alignItems: "center",
                backgroundColor: "#fff",
                justifyContent: "center",
              }}
            >
              <QRCode
                ecl="M"
                logoSize={60}
                quietZone={15}
                size={qrCodeWidth}
                logoBorderRadius={10}
                value={userData?.address}
                logoBackgroundColor="#fff"
                backgroundColor="transparent"
                logo={require("assets/images/icon.png")}
              />
            </ViewShot>

            <View
              style={{
                gap: 10,
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: "#000",
                  letterSpacing: 0.2,
                  textAlign: "center",
                }}
              >
                Your Flicks Profile Address
              </Text>
              <RgText
                style={{
                  fontSize: 14,
                  color: "#888",
                  maxWidth: 280,
                  lineHeight: 20,
                  textAlign: "center",
                }}
              >
                Use this address to share your profile with others and connect
                on Flicks
              </RgText>
              <Text></Text>
            </View>
          </View>

          <View style={[styles.btns]}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                if (userData?.address) copyToClipboard(userData?.address);
              }}
              style={[
                styles.btn,
                {
                  backgroundColor: "#e1e1e1",
                },
              ]}
            >
              <RgText
                style={{ fontSize: 15, marginBottom: -0.5, color: "#000" }}
              >
                {shortenAddress(userData?.address || "", 4, true)}
              </RgText>

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
                  <Check size={11} color={"#fff"} strokeWidth={3} />
                </View>
              ) : (
                <Copy size={15} strokeWidth={2.5} color={"#000"} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleShare}
              style={[
                styles.btn,
                {
                  backgroundColor: primaryColor,
                },
              ]}
            >
              <RgText style={{ fontSize: 15, color: "#fff" }}>
                Share QR Code
              </RgText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ShareQR;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    flexDirection: "column",
    backgroundColor: "transparent",
  },

  header: {
    height: 48,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 16,
    letterSpacing: 0.3,
  },
  cancelBtn: {
    top: 0,
    left: 10,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },

  flexView: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
  },

  btns: {
    gap: 10,
    width: "100%",
    flexDirection: "column",
  },
  btn: {
    gap: 10,
    height: 49,
    width: "100%",
    borderRadius: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});
