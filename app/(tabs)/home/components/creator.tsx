import React from "react";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { RgText, Text } from "components/ui/typography";

interface CreatorProps {
  item: string;
  badge?: string | number;
}

const Creator = ({ item, badge }: CreatorProps) => {
  return (
    <View style={[styles.creator]}>
      <View style={[styles.creatorAvatar]}>
        {badge && (
          <View
            style={[
              styles.creatorAvatar_badge,
              {
                borderWidth: 1,
                borderColor: "#fff",
                backgroundColor: "#000",
              },
            ]}
          >
            <Text style={[{ color: "#fff", fontSize: 11 }]}>{badge}</Text>
          </View>
        )}
        <Image
          style={[styles.creatorAvatar_image]}
          source={require("assets/images/mock/1.png")}
          placeholder={
            "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["
          }
          contentFit="cover"
          transition={300}
        />
      </View>
      <View style={[styles.creatorInfo]}>
        <Text style={[styles.creatorInfo__name]}>pixels.sol</Text>
        <RgText
          style={[
            styles.creatorInfo__desc,
            {
              color: "#676C75",
            },
          ]}
        >
          11k subscribers • 146 contents
        </RgText>
      </View>
    </View>
  );
};

export default Creator;

const styles = StyleSheet.create({
  // creator
  creator: {
    flexDirection: "row",
    alignItems: "center",
  },
  creatorAvatar: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 30,
    position: "relative",
    backgroundColor: "#ddd",
  },
  creatorAvatar_badge: {
    top: -3,
    right: -2,
    width: 24,
    zIndex: 1,
    height: 24,
    borderRadius: 30,
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
  },
  creatorAvatar_image: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  creatorInfo: {
    gap: 8,
    flexDirection: "column",
  },
  creatorInfo__name: {
    fontSize: 15,
    lineHeight: 15,
  },
  creatorInfo__desc: {
    fontSize: 12,
    lineHeight: 12,
  },
});
