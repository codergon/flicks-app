import Post from "./components/post";
import Topbar from "./components/topbar";
import { Fragment, useRef } from "react";
import { Container } from "components/ui/custom";
import { View, FlatList, StyleSheet } from "react-native";

const Discover = () => {
  const ref = useRef<FlatList>(null);

  function renderItem({ item, index }: { item: any; index: number }) {
    return (
      <Fragment>
        <Post isPaid={index === 1} />
      </Fragment>
    );
  }

  return (
    <Container>
      <Topbar />

      <View
        style={{
          backgroundColor: "#f3f3f3",
        }}
      >
        <FlatList
          ref={ref}
          data={[1, 2, 3]}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.container]}
        />
      </View>
    </Container>
  );
};

export default Discover;

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
