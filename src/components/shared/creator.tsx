import React from "react";
import { Image } from "expo-image";
import { router, useSegments } from "expo-router";
import { RgText, Text } from "components/_ui/typography";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface CreatorProps {
  item: any;
  size?: number;
  badge?: string | number;
}

const Creator = ({ item, size, badge }: CreatorProps) => {
  const [_, segment] = useSegments();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.creator]}
      onPress={() => {
        router.push(`/${segment}/2345`);
      }}
    >
      <View
        style={[
          styles.creatorAvatar,
          { width: size ? size : 60, height: size ? size : 60 },
        ]}
      >
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
        <Text style={[styles.creatorInfo__name]}>Rissa</Text>
        <RgText
          style={[
            styles.creatorInfo__desc,
            {
              color: "#676C75",
            },
          ]}
        >
          {item?.subText || " 11k subscribers • 146 contents"}
        </RgText>
      </View>
    </TouchableOpacity>
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
    fontSize: 14,
    lineHeight: 14,
  },
  creatorInfo__desc: {
    fontSize: 11,
    lineHeight: 11,
  },
});
