import {
  View,
  Animated,
  FlatList,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import Post from "components/shared/post";
import Topbar from "components/home/topbar";
import LottieView from "lottie-react-native";
import { Container } from "components/_ui/custom";
import { Fragment, useEffect, useRef, useState } from "react";
import SuggestedAccounts from "components/shared/suggestions";

const loadingAnimation = require("assets/lotties/loading.json");

const Home = () => {
  const refreshingHeight = 80;
  const ref = useRef<FlatList>(null);
  const lottieViewRef = useRef<LottieView>(null);

  const [offsetY, setOffsetY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [extraPaddingTop] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isRefreshing) {
      ref.current?.scrollToOffset({
        offset: -300,
        // animated: true,
      });

      // Animated.timing(extraPaddingTop, {
      //   toValue: refreshingHeight,
      //   duration: 0,
      //   useNativeDriver: false,
      // }).start();

      // lottieViewRef?.current?.play();
    } else {
      // Animated.timing(extraPaddingTop, {
      //   toValue: 0,
      //   duration: 400,
      //   useNativeDriver: false,
      //   easing: Easing.elastic(1.3),
      // }).start();
    }
  }, [isRefreshing]);

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { y } = contentOffset;
    setOffsetY(y);
  }

  function onRelease() {
    if (offsetY <= -refreshingHeight && !isRefreshing) {
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
      }, 3000);
    }
  }

  let progress = 0;
  if (offsetY < 0 && !isRefreshing) {
    progress = offsetY / -refreshingHeight;
  }

  function renderItem({ item, index }: { item: any; index: number }) {
    return (
      <Fragment>
        <Post isPaid={index === 1} />
        {index === 0 && <SuggestedAccounts />}
      </Fragment>
    );
  }

  return (
    <Container>
      {/* Top bar */}
      <Topbar />

      <View
        style={{
          backgroundColor: "#f3f3f3",
        }}
      >
        <LottieView
          ref={lottieViewRef}
          style={[
            {
              height: refreshingHeight,
              backgroundColor: "#f3f3f3",
            },
            styles.lottieView,
          ]}
          progress={progress}
          source={loadingAnimation}
        />

        <FlatList
          ref={ref}
          onScroll={onScroll}
          data={[1, 2, 3]}
          renderItem={renderItem}
          onResponderRelease={onRelease}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.container]}
          ListHeaderComponent={
            <Animated.View
              style={{
                paddingTop: extraPaddingTop,
              }}
            />
          }
        />

        {/* <View style={[styles.loadingText]}>
        <RgText
          style={{
            color: "#80848C",
          }}
        >
          Loading ...
        </RgText>
      </View> */}
      </View>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 60,
  },

  loadingText: {
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  //
  lottieView: {
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
  },
});
