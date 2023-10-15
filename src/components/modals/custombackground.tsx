import Animated, {
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";
import React, { useMemo } from "react";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";

const CustomBackground: React.FC<
  BottomSheetBackgroundProps & {
    borderRadius?: number;
  }
> = ({ style, borderRadius = 16, animatedIndex }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      ["#ffffff", "#ffffff"]
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
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
        },
      ]}
    />
  );
};

export default CustomBackground;
