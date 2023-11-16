import { useEffect, useState } from "react";
import ChainItem from "./chainItem";
import { View } from "react-native";
import { X } from "phosphor-react-native";
import { ChevronDown } from "lucide-react-native";
import { styles } from "./depositAddresses.styles";
import { useModals } from "providers/ModalsProvider";
import { useAccount } from "providers/AccountProvider";
import { RgText, Text } from "components/_ui/typography";
import { TouchableOpacity } from "components/_ui/themed";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface DepositAddressesProps {
  openOtherChains: boolean;
  setOpenOtherChains: React.Dispatch<React.SetStateAction<boolean>>;
}

const DepositAddresses = ({
  openOtherChains,
  setOpenOtherChains,
}: DepositAddressesProps) => {
  const rotate = useSharedValue(0);
  const height = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const { userData } = useAccount();
  const { closeDepositAddressesModal } = useModals();
  const [listHeight, setListHeight] = useState(400);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  const animatedHeightStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  useEffect(() => {
    rotate.value = withSpring(!openOtherChains ? 0 : 180, {
      damping: 100,
    });
    height.value = withSpring(!openOtherChains ? 0 : Number(listHeight) + 14, {
      damping: 100,
    });
  }, [openOtherChains]);

  return (
    <>
      <View
        style={[
          styles.container,
          {
            minHeight: 300,
          },
        ]}
      >
        <View
          style={[
            styles.header,
            {
              borderBottomWidth: 1,
              borderColor: "#e1e1e1",
            },
          ]}
        >
          <View
            style={{
              gap: 6,
              flex: 1,
              flexDirection: "column",
            }}
          >
            <Text style={[{ fontSize: 18 }]}>Top up your wallet</Text>
            <RgText style={[{ fontSize: 13, color: "#777" }]}>
              Send at least{" "}
              <Text style={[{ fontSize: 12, color: "#000" }]}>1 USDC </Text>
              to any of the provided addresses.
            </RgText>
          </View>

          <TouchableOpacity
            onPress={closeDepositAddressesModal}
            style={[
              {
                padding: 6,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <X size={18} weight="bold" color={"#000"} />
          </TouchableOpacity>
        </View>

        <View style={[styles.chains]}>
          <BottomSheetScrollView
            style={{ width: "100%" }}
            contentContainerStyle={{
              gap: 8,
              paddingTop: 12,
              paddingHorizontal: 16,
              paddingBottom: insets.bottom + 22,
            }}
          >
            <View
              style={[
                styles.preferredChain,
                {
                  gap: 14,
                  paddingTop: 10,
                  paddingBottom: 18,
                },
              ]}
            >
              <Text style={{ paddingHorizontal: 2 }}>Preferred chain</Text>
              <ChainItem
                isPreferred
                chain={userData?.wallet?.deposit_addresses.find(
                  (c) => c.blockchain.toLowerCase() === "algo"
                )}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setOpenOtherChains((p) => !p);
              }}
              style={[
                {
                  gap: 14,
                  paddingTop: 10,
                  marginBottom: 14,
                  paddingBottom: 10,
                  marginHorizontal: 2,
                  borderColor: "#ddd",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                },
              ]}
            >
              <Text>Other supported chains</Text>
              <Animated.View style={[animatedStyles]}>
                <ChevronDown size={20} color={"#000"} />
              </Animated.View>
            </TouchableOpacity>

            <Animated.View
              style={[
                {
                  width: "100%",
                  overflow: "hidden",
                  position: "relative",
                },
                animatedHeightStyle,
              ]}
            >
              <View
                onLayout={(e) => {
                  setListHeight(e.nativeEvent.layout.height);
                }}
                style={{
                  gap: 8,
                  top: 0,
                  left: 0,
                  width: "100%",
                  position: "absolute",
                  flexDirection: "column",
                }}
              >
                {userData?.wallet?.deposit_addresses
                  .filter((c) => c.blockchain.toLowerCase() !== "algo")
                  .map((chain, index) => {
                    return <ChainItem key={index} chain={chain} />;
                  })}
              </View>
            </Animated.View>
          </BottomSheetScrollView>
        </View>
      </View>
    </>
  );
};

export default DepositAddresses;
