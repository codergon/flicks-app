import { Fragment, useCallback, useState } from "react";
import { styles } from "./discover.styles";
import Content from "components/discover/content";
import { Container } from "components/_ui/custom";
import { RgText } from "components/_ui/typography";
import Searchbar from "components/_common/Searchbar";
import SearchHistory from "./searchOverlay/searchHistory";
import MasonryList from "@react-native-seoul/masonry-list";
import { Keyboard, TouchableOpacity, View } from "react-native";
import { useApp } from "providers/AppProvider";
import { useAccount } from "providers/AccountProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IPost } from "typings/post";
import { ScrollView } from "components/_ui/themed";
import { RefreshControl } from "react-native-gesture-handler";
import EmptyState from "components/shared/emptyState";
import { Image } from "lucide-react-native";

const Discover = () => {
  const [search, setSearch] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);

  const { setSearchQuery } = useApp();
  const { userData, userSignature } = useAccount();

  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, error, refetch } = useQuery(
    ["discover-page", userSignature?.publicKey],
    async () =>
      axios
        .get(`/contents/discover`, {
          headers: {
            Authorization: `Signature ${userSignature?.publicKey}:${userSignature?.signature}`,
          },
        })
        .then((res) => res.data?.data?.results),
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
      <View
        style={[
          styles.header,
          {
            borderColor: "#ececec",
            borderBottomWidth: true ? 0 : 1,
          },
        ]}
      >
        <Fragment>
          <Searchbar
            value={search}
            onFocus={() => {
              setShowOverlay(true);
            }}
            onChangeText={setSearch}
          />
          {showOverlay && (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setShowOverlay(false);
                setSearch("");
                Keyboard.dismiss();
                setSearchQuery({
                  data: null,
                  loading: false,
                  error: null,
                });
              }}
              style={styles.cancelSearch}
            >
              <RgText>Cancel</RgText>
            </TouchableOpacity>
          )}
        </Fragment>
      </View>

      <View style={styles.discover_body}>
        {showOverlay && <SearchHistory setSearch={setSearch} />}

        {isLoading || error || !data || data.length === 0 ? (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={{ width: "100%" }}
          >
            <EmptyState
              emptyIcon={<Image size={34} color={"#000"} strokeWidth={1.4} />}
              error={error}
              isLoading={isLoading}
              data={{
                message: "Nothing here yet",
                loadingText: "Fetching posts...",
                errorMessage: "An error occured while fetching posts",
              }}
            />
          </ScrollView>
        ) : (
          <MasonryList
            data={data as IPost[]}
            refreshing={refreshing}
            onRefresh={onRefresh}
            numColumns={3}
            renderItem={({ item }) => (
              <Fragment>
                <Content item={item as IPost} />
              </Fragment>
            )}
            onEndReachedThreshold={0.1}
            keyExtractor={(i) => i?.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.listContainer]}
          />
        )}
      </View>
    </Container>
  );
};

export default Discover;
