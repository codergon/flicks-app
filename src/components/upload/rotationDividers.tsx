import * as Haptics from "expo-haptics";
import { padding } from "helpers/styles";
import { MediaType } from "contexts/AppContext";
import { Fragment, useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, View } from "react-native";

const angles = [
  ...Array.from({ length: 45 }, (_, i) => i - 45),
  0,
  ...Array.from({ length: 45 }, (_, i) => i + 1),
];

interface RotationDividersProps {}

const RotationDividers = ({}: RotationDividersProps) => {
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

  return (
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
  );
};

export default RotationDividers;

const styles = StyleSheet.create({
  footer_row: {
    width: "100%",
    ...padding(0, 18),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
