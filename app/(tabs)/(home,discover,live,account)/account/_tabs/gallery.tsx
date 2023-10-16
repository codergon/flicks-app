import axios from "axios";
import { StyleSheet, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import EmptyState from "components/shared/emptyState";
import { useAccount } from "providers/AccountProvider";
import { Tabs } from "react-native-collapsible-tab-view";
import ProfileMediaItem from "components/profile/mediaItem";
import { RefreshControl } from "react-native-gesture-handler";
import { Image } from "lucide-react-native";
import { useCallback, useState } from "react";

const MediaGallery = () => {
  const { userSignature } = useAccount();

  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, error, refetch } = useQuery(
    ["account-media", userSignature?.publicKey],
    async () =>
      axios
        .get(`/contents/media/${userSignature?.publicKey}`, {
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

  if (isLoading || error || !data || data.length === 0)
    return (
      <Tabs.ScrollView
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
            loadingText: "Fetching media...",
            errorMessage: "An error occured while fetching media",
            message: "No media yet",
          }}
        />
      </Tabs.ScrollView>
    );

  return (
    <Tabs.MasonryFlashList
      data={data}
      numColumns={3}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({ item }) => <ProfileMediaItem item={item} />}
      estimatedItemSize={200}
      contentContainerStyle={{
        ...styles.listContainer,
      }}
      ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
      onEndReachedThreshold={0.1}
      keyExtractor={(i: any) => i.toString()}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={[{ flex: 1 }]}
    />
  );
};

export default MediaGallery;

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 12,
    paddingBottom: 60,
    paddingHorizontal: 13,
  },
});
