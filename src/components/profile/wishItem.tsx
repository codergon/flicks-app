import { Image } from "expo-image";
import { router } from "expo-router";
import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";
import { Play, Stack } from "phosphor-react-native";
import { TouchableOpacity, View } from "react-native";
import { RgText, Text } from "components/_ui/typography";
import { primaryColor } from "constants/Colors";

interface ContentProps {
  item: any;
  fulfilled?: boolean;
}

const ProfileWishItem = ({ item, fulfilled }: ContentProps) => {
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
        style={[
          styles.mediaImage,
          {
            opacity: fulfilled ? 0.7 : 1,
          },
        ]}
        source={require("assets/images/mock/15.png")}
      />

      <View style={[styles.details]}>
        <Text style={[styles.title, {}]}>Oak Tray</Text>
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
                backgroundColor: "#e6e6e6",
                opacity: fulfilled ? 0.7 : 1,
              },
            ]}
          >
            <Text
              style={{
                fontSize: 12,
                color: "#000",
                textDecorationStyle: "solid",
                textDecorationLine: fulfilled ? "line-through" : "none",
              }}
            >
              $300
            </Text>
          </View>

          {fulfilled ? (
            <View
              style={[
                {
                  flex: 1,
                  marginLeft: 10,
                  flexDirection: "row",
                },
              ]}
            >
              <RgText style={[{ fontSize: 12, color: "#676C75" }]}>
                Wish fulfilled by <Text style={{ color: "#000" }}>Trey H.</Text>
              </RgText>
            </View>
          ) : (
            <>
              <View
                style={[
                  {
                    flex: 1,
                    marginLeft: 10,
                    flexDirection: "row",
                  },
                ]}
              >
                <Text
                  style={[
                    { fontSize: 12, color: primaryColor, letterSpacing: 0.3 },
                  ]}
                >
                  {/* Fulfill wish for Jackson */}
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileWishItem;

const styles = StyleSheet.create({
  content: {
    gap: 16,
    borderRadius: 14,
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",

    ...padding(8),
    borderWidth: 1,
    borderColor: "#e2e2e2",
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
