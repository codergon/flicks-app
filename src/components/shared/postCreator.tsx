import React from "react";
import { Image } from "expo-image";
import { ICreator } from "typings/post";
import TimeAgo from "components/_common/TimeAgo";
import { Text } from "components/_ui/typography";
import { router, useSegments } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface CreatorProps {
  data: ICreator & {
    created_at: string;
  };
  size?: number;
  badge?: string | number;
}

const PostCreator = ({ data, size, badge }: CreatorProps) => {
  const [, segment] = useSegments();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.creator]}
      onPress={() => {
        router.push(`/${segment}/${data?.address}` as any);
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
          transition={100}
          contentFit="cover"
          source={{ uri: data?.image_url }}
          style={[styles.creatorAvatar_image]}
          placeholder={"LKN]Rv%2Tw=w]~RBVZRi};RPxuwH"}
        />
      </View>
      <View style={[styles.creatorInfo]}>
        <Text style={[styles.creatorInfo__name]}>{data?.moniker}</Text>
        {data?.created_at && (
          <TimeAgo
            date={Date.parse(data?.created_at)}
            textStyle={{
              ...styles.creatorInfo__desc,
              color: "#676C75",
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PostCreator;

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
