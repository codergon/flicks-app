import { Image } from "expo-image";
import { router } from "expo-router";
import { padding } from "helpers/styles";
import { Animated, StyleSheet } from "react-native";
import { TouchableOpacity, View } from "react-native";
import { RgText, Text } from "components/_ui/typography";
import Colors, { primaryColor } from "constants/Colors";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { useState } from "react";
import useColorScheme from "hooks/useColorScheme";
import { Check, MoreVertical, Trash, Trash2 } from "lucide-react-native";

interface ContentProps {
  item: any;
  itemIndex: number;
  fulfilled?: boolean;
  closeRow: (index: number) => void;
  wishItemsRef: React.MutableRefObject<Swipeable[]>;
}

const AccountWishItem = ({
  item,
  closeRow,
  itemIndex,
  fulfilled,
  wishItemsRef,
}: ContentProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const paletteBg = isDark ? Colors.dark.background : Colors.light.background;

  const [swiping, setSwiping] = useState(false);

  const onPressMenu = (actionKey: string) => {
    switch (actionKey) {
      case "delete":
        console.log("delete");
        break;
    }
  };

  return (
    <Swipeable
      ref={(el) => (wishItemsRef.current[itemIndex] = el as Swipeable)}
      overshootFriction={4}
      containerStyle={{
        backgroundColor: paletteBg,
      }}
      onActivated={() => {
        setSwiping(true);
        closeRow(itemIndex);
      }}
      onSwipeableClose={() => {
        setSwiping(false);
      }}
      renderRightActions={(progress, dragX) => {
        const trans = dragX.interpolate({
          inputRange: [-101, -100, -50, 0],
          outputRange: [0, 0, 0, 20],
          extrapolate: "clamp",
        });

        const opacity = dragX.interpolate({
          inputRange: [-50, 0],
          outputRange: [1, 0],
          extrapolate: "clamp",
        });

        return (
          // @ts-ignore
          <RectButton
            style={[
              styles.leftAction,
              {
                backgroundColor: "#dd2c0010",
              },
            ]}
            onPress={() => {
              onPressMenu("delete");
            }}
          >
            <Animated.View
              style={[
                styles.swipeDelete,
                {
                  opacity,
                  transform: [{ translateX: trans }],
                },
              ]}
            >
              <Trash2 size={22} color={"#ff4921"} strokeWidth={1.8} />
            </Animated.View>
          </RectButton>
        );
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {}}
        style={[
          styles.content,
          {
            backgroundColor: "#fff",
          },
        ]}
      >
        <View style={[styles.mediaImageContainer]}>
          <Image
            transition={300}
            contentFit="cover"
            style={[
              styles.mediaImage,
              {
                // opacity: fulfilled ? 0.7 : 1,
              },
            ]}
            source={require("assets/images/mock/1.png")}
          />

          {fulfilled && (
            <View
              style={[
                styles.mediaImage_badge,
                {
                  borderWidth: 1,
                  borderColor: "#fff",
                  backgroundColor: "#1f9b37",
                },
              ]}
            >
              <Check size={12} color="#fff" strokeWidth={3} />
            </View>
          )}
        </View>

        <View style={[styles.detailsContainer]}>
          <View style={[styles.details]}>
            <Text style={[styles.title, {}]}>Oak Tray</Text>
            <RgText
              numberOfLines={1}
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
                    Wish fulfilled by{" "}
                    <Text style={{ color: "#000" }}>Trey H.</Text>
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
                        {
                          fontSize: 12,
                          color: primaryColor,
                          letterSpacing: 0.3,
                        },
                      ]}
                    >
                      {/* Fulfill wish for Jackson */}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>

          <TouchableOpacity onPress={() => {}} style={[styles.moreBtn]}>
            <MoreVertical size={18} color="#000" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default AccountWishItem;

const styles = StyleSheet.create({
  // Swipeable
  leftAction: {
    borderRadius: 14,
    marginLeft: -100,
    overflow: "hidden",
    justifyContent: "center",
  },
  swipeDelete: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20 + 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  // WishItem content
  content: {
    gap: 16,
    borderRadius: 14,

    // flexDirection: "column",
    flexDirection: "row",

    paddingHorizontal: 16,
    alignItems: "center",

    ...padding(8),
    borderWidth: 1,
    borderColor: "#e2e2e2",
  },

  mediaImageContainer: {
    // width: "100%",
    // height: 82,

    width: 62,
    height: 62,

    borderRadius: 8,
    position: "relative",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  mediaImage_badge: {
    top: -3,
    right: -4,
    width: 18,
    zIndex: 1,
    height: 18,
    borderRadius: 30,
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
  },

  detailsContainer: {
    gap: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

  moreBtn: {
    zIndex: 99,
    alignItems: "center",
    ...padding(8, 0, 8, 10),
    justifyContent: "center",
  },
});
