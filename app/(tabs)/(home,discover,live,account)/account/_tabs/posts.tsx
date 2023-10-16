import { IPost } from "typings/post";
import Post from "components/shared/post";
import { useApp } from "providers/AppProvider";
import { useCallback, useState } from "react";
import { RefreshControl } from "react-native";
import { StyleSheet, View } from "react-native";
import EmptyState from "components/shared/emptyState";
import { Tabs } from "react-native-collapsible-tab-view";
import { GalleryVerticalEnd } from "lucide-react-native";

const AccountPostsTab = () => {
  const { usersPostQuery } = useApp();
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
            loadingText: "Fetching posts...",
            errorMessage: "An error occured while fetching posts",
            message: "No posts yet",
          }}
        />
      </Tabs.ScrollView>
    );

  return (
    <Tabs.FlatList
      data={usersPostQuery.data as IPost[]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <Post
            post={item}
            showBorder={index !== usersPostQuery.data?.length - 1}
          />
        );
      }}
      contentContainerStyle={{ paddingBottom: 50 }}
      keyExtractor={(item, index) => item?.id ?? index.toString()}
    />
  );
};

export default AccountPostsTab;

const styles = StyleSheet.create({});
