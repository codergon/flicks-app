import { IPost } from "typings/post";
import Post from "components/shared/post";
import { useApp } from "providers/AppProvider";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import EmptyState from "components/shared/emptyState";
import { Tabs } from "react-native-collapsible-tab-view";
import { GalleryVerticalEnd } from "lucide-react-native";
import RefreshControl from "components/_common/RefreshControl";
import CurrentUpload from "components/account/currentUpload";

const AccountPostsTab = () => {
  const { currentUpload, usersPostQuery } = useApp();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await usersPostQuery.refetch();
    setRefreshing(false);
  }, []);

  if (
    usersPostQuery.isLoading ||
    usersPostQuery.error ||
    !usersPostQuery.data ||
    usersPostQuery.data.length === 0
  )
    return (
      <Tabs.ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ width: "100%" }}
      >
        <EmptyState
          emptyIcon={
            <GalleryVerticalEnd size={34} color={"#000"} strokeWidth={1.4} />
          }
          error={usersPostQuery.error}
          isLoading={usersPostQuery.isLoading}
          data={{
            message: "No posts yet",
            loadingText: "Fetching posts...",
            errorMessage: "An error occured while fetching posts",
          }}
        />
      </Tabs.ScrollView>
    );

  return (
    <Tabs.FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={usersPostQuery.data as IPost[]}
      contentContainerStyle={{ paddingBottom: 50 }}
      keyExtractor={(item, index) => item?.id ?? index.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={() => (currentUpload ? <CurrentUpload /> : <></>)}
      renderItem={({ item, index }) => {
        return (
          <Post
            post={item}
            showBorder={index !== usersPostQuery.data?.length - 1}
          />
        );
      }}
    />
  );
};

export default AccountPostsTab;

const styles = StyleSheet.create({});
