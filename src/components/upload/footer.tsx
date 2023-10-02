import { padding } from "helpers/styles";
import Icons from "components/_common/Icons";
import { Fragment, useRef, useState } from "react";
import { RgText } from "components/_ui/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Animated,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ArrowUUpLeft,
  Perspective,
  SpeakerSimpleSlash,
} from "phosphor-react-native";
import * as Haptics from "expo-haptics";

const angles = [
  ...Array.from({ length: 45 }, (_, i) => i - 45),
  0,
  ...Array.from({ length: 45 }, (_, i) => i + 1),
];

const UploadFooter = () => {
  const insets = useSafeAreaInsets();

  const data = [1, 2, 3];
  const scrollX = useRef(new Animated.Value(0)).current;

  const [currentIndex, setCurrentIndex] = useState(0);
  const handleViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any; changed: any }) => {
      //   console.log(viewableItems[0]?.item);
      //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      setCurrentIndex(viewableItems[0]?.index || 0);
    }
  ).current;
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const editMedia = (action: string) => {
    console.log(action);
  };

  return (
    <Fragment>
      <View
        style={[
          styles.footer,
          {
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: "#333",
            backgroundColor: "transparent",
            paddingBottom: insets.bottom + 6,
          },
        ]}
      >
        <View style={[styles.footer_row]}>
          <View
            style={[
              {
                width: "100%",
                position: "relative",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              },
            ]}
          >
            <View
              style={[
                {
                  top: 0,
                  width: 1.6,
                  height: 26,
                  //   marginLeft: -0.3,
                  borderRadius: 6,
                  position: "absolute",
                  backgroundColor: "#fff",
                },
              ]}
            />

            <FlatList
              horizontal
              pagingEnabled
              data={angles}
              decelerationRate="fast"
              snapToInterval={1.6 + 8}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              viewabilityConfig={viewabilityConfig}
              keyExtractor={(item, index) => index.toString()}
              onViewableItemsChanged={handleViewableItemsChanged}
              ItemSeparatorComponent={() => {
                return (
                  <View
                    style={[
                      {
                        width: 8,
                        height: "100%",
                      },
                    ]}
                  />
                );
              }}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      width: 1.6,
                      height: 12 + 3.6 + 5,
                      alignItems: "center",
                      position: "relative",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    {item === 0 && (
                      <View
                        style={[
                          {
                            top: 0,
                            width: 3.6,
                            height: 3.6,
                            borderRadius: 12,
                            position: "absolute",
                            backgroundColor: "#fff",
                          },
                        ]}
                      />
                    )}

                    <View
                      style={[
                        {
                          height: 12,
                          borderRadius: 6,
                          width: item === 0 || item % 30 === 0 ? 1.6 : 1,
                          backgroundColor:
                            item === 0 || item % 30 === 0 ? "#fff" : "#ccc",
                        },
                      ]}
                    />
                  </View>
                );
              }}
              contentContainerStyle={{
                paddingBottom: 14,
              }}
            />
          </View>
        </View>

        <View style={[styles.footer_row]}>
          <View style={[styles.actionBtns]}>
            {(!true
              ? [
                  {
                    action: "mute",
                    icon: <SpeakerSimpleSlash size={20} color="#fff" />,
                  },
                ]
              : [
                  {
                    action: "rotate",
                    icon: <Icons.Rotate size={20} color="#fff" />,
                  },
                  {
                    action: "Flip H",
                    icon: (
                      <Perspective
                        size={20}
                        color="#fff"
                        style={{
                          transform: [{ rotate: "90deg" }],
                        }}
                      />
                    ),
                  },
                  {
                    action: "Flip V",
                    icon: <Perspective size={20} color="#fff" />,
                  },
                  {
                    action: "rotate",
                    icon: <ArrowUUpLeft size={20} color="#fff" />,
                  },
                ]
            ).map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.actionBtn,
                    {
                      backgroundColor: "#1a1a1a",
                    },
                  ]}
                  onPress={() => editMedia(item.action)}
                >
                  {item.icon}
                  <RgText
                    style={{
                      fontSize: 12,
                      color: "#fff",
                      display: "none",
                      textTransform: "capitalize",
                    }}
                  >
                    {item.action}
                  </RgText>
                </TouchableOpacity>
              );
            })}
          </View>

          {!false && (
            <View
              style={[
                styles.actionBtn,
                {
                  width: 43,
                  height: 43,
                  borderWidth: 0.6,
                  borderColor: "#555",
                  backgroundColor: "#121212",
                },
              ]}
            >
              <RgText
                style={{
                  fontSize: 12,
                  color: "#fff",
                  letterSpacing: 0.5,
                }}
              >
                -45
              </RgText>
            </View>
          )}
        </View>
      </View>
    </Fragment>
  );
};

export default UploadFooter;

const styles = StyleSheet.create({
  footer: {
    gap: 22,
    width: "100%",
    paddingTop: 16,
    flexDirection: "column",
  },
  footer_row: {
    width: "100%",
    ...padding(0, 18),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionBtns: {
    gap: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  actionBtn: {
    gap: 12,
    width: 44,
    height: 44,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
