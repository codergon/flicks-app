import Animated, {
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";
import React, { useMemo } from "react";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";

const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
  style,
  animatedIndex,
}) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      ["#ffffff", "#fff"]
      // ["#ffffff", "#a8b5eb"]
    ),
  }));
  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle]
  );

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        containerStyle,
        {
          borderRadius: 16,
        },
      ]}
    />
  );
};

export default CustomBackground;
