import { useState } from "react";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { RgText, Text } from "components/_ui/typography";
import { FlatList, StyleSheet, View } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";

interface IUpdate {
  message: string;
  user_name: string;
  user_image: string;
}

const Update = ({ item }: { item: IUpdate }) => {
  return (
    <View
      style={{
        width: "100%",
        overflow: "hidden",
        paddingHorizontal: 16,
      }}
    >
      <View style={[styles.viewerDetails]}>
        <View style={[styles.viewerAvatar, { borderColor: "#fff" }]}>
          <Image
            contentFit="cover"
            style={[styles.viewerAvatarImage]}
            source={{ uri: item?.user_image }}
          />
        </View>

        <View style={[styles.viewerName]}>
          <Text style={[styles.viewerNameText, { color: "#fff" }]}>
            {item?.user_name}
          </Text>
          <RgText style={[styles.viewerNameSubText, { color: "#fff" }]}>
            {item?.message}
          </RgText>
        </View>
      </View>
    </View>
  );
};

const StreamUpdates = ({ messages }: { messages: IUpdate[] }) => {
  return (
    <>
      <MaskedView
        style={{
          flex: 1,
          maxHeight: 300,
          flexDirection: "column",
        }}
        maskElement={
          <LinearGradient
            style={{ flex: 1 }}
            locations={[0, 0.24]}
            colors={["transparent", "#000"]}
          />
        }
      >
        <FlatList
          inverted
          data={messages}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ backgroundColor: "rgba(0,0,0,0.24)" }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <Update item={item} />}
          contentContainerStyle={{ gap: 12, paddingVertical: 16 }}
        />
      </MaskedView>
    </>
  );
};

export default StreamUpdates;

const styles = StyleSheet.create({
  backgroundOverlay: {
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    width: "100%",
    position: "absolute",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  viewerDetails: {
    gap: 8,
    flexDirection: "row",
  },
  viewerAvatar: {
    height: 30,
    borderWidth: 1,
    aspectRatio: 1,
    borderRadius: 30,
    overflow: "hidden",
  },
  viewerAvatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  viewerName: {
    gap: 2,
    flex: 1,
    flexDirection: "column",
  },
  viewerNameText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  viewerNameSubText: {
    fontSize: 13,
  },
});
