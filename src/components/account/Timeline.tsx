import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import useColorScheme from "hooks/useColorScheme";

interface TimelineProps {
  activeStep: number;
  sliderColor?: string;
  sliderHeight?: number;
  numberOfSteps?: number;
}

const Timeline = ({
  sliderColor,
  activeStep = 0,
  numberOfSteps = 4,
  sliderHeight = 4.6,
}: TimelineProps) => {
  const ANIMATION_DURATION = 300;
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const progress = useSharedValue(0);
  const sliderDefault = isDark ? "#ddd" : "#333";
  const sliderUnderlay = isDark ? "#333" : "#ddd";

  const handlePress = () => {
    progress.value = withTiming((activeStep * 1) / (numberOfSteps - 1), {
      easing: Easing.linear,
      duration: ANIMATION_DURATION,
    });
  };

  useEffect(() => {
    handlePress();
  }, [activeStep]);

  const lineStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  return (
    <>
      <View style={styles.timeline}>
        <View style={[styles.sliderContainer]}>
          <Animated.View
            style={[
              lineStyle,
              styles.slider,
              {
                zIndex: 2,
                height: sliderHeight,
                backgroundColor: sliderColor || sliderDefault,
              },
            ]}
          />

          <View
            style={[
              styles.sliderUnderlay,
              {
                borderRadius: 20,
                backgroundColor: sliderUnderlay,
              },
            ]}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timeline: {
    width: "100%",
    borderRadius: 40,
    marginVertical: 4,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  sliderContainer: {
    width: "100%",
    position: "absolute",
  },
  slider: {
    borderRadius: 4,
    maxWidth: "100%",
  },
  sliderUnderlay: {
    opacity: 0.8,
    width: "100%",
    height: "100%",
    alignSelf: "center",
    position: "absolute",
  },
});

export default Timeline;
