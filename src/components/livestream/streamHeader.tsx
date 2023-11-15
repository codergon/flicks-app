import { Image } from "expo-image";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { Eye, X } from "phosphor-react-native";
import { primaryColor } from "constants/colors";
import { StatusBar, StyleSheet } from "react-native";
import { RgText, Text } from "components/_ui/typography";
import { TouchableOpacity, View } from "components/_ui/themed";

interface LiveStreamHeaderProps {
  isHost: boolean;
  exitStream: () => void;
}

const LiveStreamHeader = ({ isHost, exitStream }: LiveStreamHeaderProps) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
    }, [])
  );

  return (
    <>
      <View style={[styles.header]}>
        <View style={[styles.headerBlock, { height: 44 }]}>
          <View style={[styles.hostDetails]}>
            <View style={[styles.hostAvatar, { borderColor: "#fff" }]}>
              <Image
                transition={300}
                contentFit="cover"
                style={[styles.hostAvatarImage]}
                source={require("assets/images/mock/1.png")}
              />
            </View>
            <View style={[styles.hostName]}>
              <Text style={[styles.hostNameText, { color: "#fff" }]}>
                Anthploxy
              </Text>
              <RgText style={[styles.hostNameSubText, { color: "#fff" }]}>
                {isHost ? "Host" : "You"}
              </RgText>
            </View>
          </View>

          <View style={{ minWidth: 10 }}>
            {false && (
              <TouchableOpacity
                style={[
                  styles.subsscriberBtn,
                  {
                    backgroundColor: primaryColor,
                  },
                ]}
              >
                <Text style={{ color: "#fff", fontSize: 11 }}>Subscribe</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={[styles.rowCenter]}>
          <View
            style={[
              styles.headerBlock,
              {
                gap: 5,
                paddingVertical: 6,
                paddingHorizontal: 14,
              },
            ]}
          >
            <Eye size={18} color="#fff" />
            <Text style={[styles.viewersCount, { color: "#fff" }]}>35</Text>
          </View>

          <TouchableOpacity
            style={[styles.actionbtn, { backgroundColor: "transparent" }]}
          >
            <X size={20} color="#fff" weight="bold" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default LiveStreamHeader;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  columnEnd: {
    flexDirection: "column-reverse",
    alignItems: "flex-end",
  },

  header: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  headerBlock: {
    gap: 10,
    padding: 4,
    borderRadius: 32,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.11)",
  },

  hostDetails: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  hostAvatar: {
    height: "100%",
    borderWidth: 1,
    aspectRatio: 1,
    borderRadius: 30,
    overflow: "hidden",
  },
  hostAvatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  hostName: {
    gap: 2,
    flexDirection: "column",
  },
  hostNameText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  hostNameSubText: {
    fontSize: 11,
  },
  subsscriberBtn: {
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    paddingHorizontal: 11,
    justifyContent: "center",
  },

  viewersCount: {
    flexDirection: "row",
  },

  actionbtn: {
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
