import { useState } from "react";
import { Image } from "expo-image";
import { padding } from "helpers/styles";
import useClipboard from "hooks/useClipboard";
import { Copy, Check } from "lucide-react-native";
import shortenAddress from "utils/shortenAddress";
import { RgText, Text } from "components/_ui/typography";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ChainItemProps {
  chain: any;
  isPreferred?: boolean;
}

const ChainItem = ({ chain, isPreferred }: ChainItemProps) => {
  const [copied = false, copyToClipboard] = useClipboard();

  return (
    <View
      style={[
        styles.chain,
        {
          borderColor: "#bbb",
        },
      ]}
    >
      <View style={[styles.chainInfo]}>
        <View style={[styles.chainImage]}>
          <Image
            transition={300}
            contentFit="contain"
            style={[styles.image]}
            source={{
              uri: `https://flicks.hop.sh/images/${chain?.blockchain}.svg`,
            }}
          />
        </View>
        <View style={[styles.chainDetails]}>
          <Text style={{ fontSize: 14 }}>
            {chain?.blockchain}
            {/* {isPreferred ? " (Preferred Chain)" : ""} */}
          </Text>
          {chain?.address && (
            <RgText style={{ fontSize: 12, color: "#777" }}>
              {shortenAddress(chain?.address, 8)}
            </RgText>
          )}
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          if (chain?.address) copyToClipboard(chain?.address);
        }}
        style={[
          styles.copyBtn,
          {
            backgroundColor: copied ? "transparent" : "rgba(0,0,0,0.06)",
          },
        ]}
      >
        {copied ? (
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#419B45",
            }}
          >
            <Check size={13} color={"#fff"} strokeWidth={3} />
          </View>
        ) : (
          <Copy size={14} fill={"none"} color={"#000"} strokeWidth={2} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ChainItem;

const styles = StyleSheet.create({
  // chain
  chain: {
    gap: 12,
    width: "100%",
    borderWidth: 0.3,
    borderRadius: 14,
    ...padding(10, 14),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    justifyContent: "space-between",
  },
  chainInfo: {
    gap: 14,
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    flexDirection: "row",
  },

  chainImage: {
    width: 38,
    height: 38,
    padding: 4,
    borderRadius: 40,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  chainDetails: {
    gap: 6,
    flex: 1,
    flexDirection: "column",
  },
  copyBtn: {
    width: 28,
    height: 28,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: "#eee",
    justifyContent: "center",
  },
});
