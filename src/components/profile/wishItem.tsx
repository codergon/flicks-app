import { Image } from "expo-image";
import { router } from "expo-router";
import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";
import { Play, Stack } from "phosphor-react-native";
import { TouchableOpacity, View } from "react-native";
import { RgText, Text } from "components/_ui/typography";

interface ContentProps {
  item: any;
}

const ProfileWishItem = ({ item }: ContentProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        // router.push({
        //   pathname: `/(tabs)/(discover)/discover/${item.id}`,
        //   params: { item: item },
        // });
      }}
      style={[styles.content]}
    >
      <Image
        transition={300}
        contentFit="cover"
        style={[styles.mediaImage]}
        source={require("assets/images/mock/15.png")}
      />

      <View style={[styles.details]}>
        <Text style={[styles.title]}>Oak Tray</Text>
        <RgText
          style={[
            styles.desc,
            {
              color: "#676C75",
            },
          ]}
        >
          Linwnil 2 Pack Solid Wood Serving Platters (Fine wood)
        </RgText>

        <View style={[styles.actionBtns]}>
          <View
            style={[
              {
                borderRadius: 20,
                ...padding(4, 8),
                backgroundColor: "#e4e4e4",
              },
            ]}
          >
            <Text style={{ fontSize: 12, color: "#000" }}>$300</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileWishItem;

const styles = StyleSheet.create({
  content: {
    gap: 14,
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
  },

  mediaImage: {
    width: 62,
    height: 62,
    borderRadius: 8,
  },

  details: {
    gap: 6,
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 14,
    lineHeight: 14,
  },
  desc: {
    fontSize: 11,
    lineHeight: 11,
    marginBottom: 2,
  },

  actionBtns: {
    flexDirection: "row",
    alignItems: "center",
  },
});
