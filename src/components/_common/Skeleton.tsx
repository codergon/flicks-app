import ShimmerPlaceholder from "constants/shimmer";
import useColorScheme from "hooks/useColorScheme";
import { ShimmerPlaceholderProps } from "react-native-shimmer-placeholder";

interface SkeletonProps {
  showContent?: boolean;
  animationSpeed?: number;
}

const Skeleton: React.FC<ShimmerPlaceholderProps & SkeletonProps> = (props) => {
  const isDark = useColorScheme() === "dark";
  const {
    width = 150,
    height = 18,
    style = {},
    showContent = false,
    animationSpeed = 2000,
  } = props;

  return (
    <>
      <ShimmerPlaceholder
        {...props}
        width={width}
        delay={1000}
        height={height}
        visible={showContent}
        duration={8000 ?? animationSpeed}
        shimmerStyle={{ borderRadius: 800 }}
        style={[
          {
            borderRadius: showContent ? 0 : 8,
            marginVertical: showContent ? 0 : 1,
          },
          style,
        ]}
        shimmerColors={
          isDark ? ["#444", "#555", "#444"] : ["#eee", "#c9c9c9", "#eee"]
        }
      />
    </>
  );
};

export default Skeleton;
