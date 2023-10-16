import { Fragment, useCallback, useState } from "react";
import Post from "components/shared/post";
import Topbar from "components/home/topbar";
import { Container } from "components/_ui/custom";
import { View, FlatList, StyleSheet } from "react-native";

import axios from "axios";
import { useAccount } from "providers/AccountProvider";
import { useQuery } from "@tanstack/react-query";
import { ScrollView } from "components/_ui/themed";
import { RefreshControl } from "react-native-gesture-handler";
import { CircleOff, List } from "lucide-react-native";
import EmptyState from "components/shared/emptyState";
import { IPost } from "typings/post";

const Home = () => {
  const { userSignature } = useAccount();
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, error, refetch } = useQuery(
    ["timeline", userSignature?.publicKey],
    async () =>
      axios
        .get(`/contents/timeline`, {
          headers: {
            Authorization: `Signature ${userSignature?.publicKey}:${userSignature?.signature}`,
          },
        })
        .then((res) => res.data?.results),
    {
      enabled: !!userSignature?.signature,
    }
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);

  return (
    <Container>
      <Topbar />

      {isLoading || error || !data || data.length === 0 ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{ width: "100%" }}
        >
          <EmptyState
            emptyIcon={<List size={34} color={"#000"} strokeWidth={1.4} />}
            errorIcon={<CircleOff size={34} color={"#000"} strokeWidth={1.4} />}
            error={error}
            isLoading={isLoading}
            data={{
              loadingText: "Fetching timeline...",
              errorMessage: "An error occured while fetching timeline",
              message: "Nothing here yet",
            }}
          />
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            style={{ flex: 1, width: "100%" }}
            renderItem={({ item, index }) => {
              return (
                <Fragment key={index}>
                  <Post
                    post={item as IPost}
                    showBorder={index !== data.length - 1}
                  />
                </Fragment>
              );
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.container]}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      )}
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 40,
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
