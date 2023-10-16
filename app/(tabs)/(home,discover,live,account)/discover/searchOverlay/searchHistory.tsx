import { nanoid } from "nanoid";
import { Fragment } from "react";
import { Image } from "expo-image";
import { SearchX } from "lucide-react-native";
import { useApp } from "providers/AppProvider";
import { styles } from "./searchOverlay.styles";
import { router, useSegments } from "expo-router";
import { Text } from "components/_ui/typography";
import { ScrollView } from "components/_ui/themed";
import { TouchableOpacity, View } from "react-native";
import EmptyState from "components/shared/emptyState";
import { MagnifyingGlass, X } from "phosphor-react-native";
import { RecentSearch, RecentSearchCreator } from "typings/common";

interface SearchHistoryProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchHistory = ({ setSearch }: SearchHistoryProps) => {
  const [, segment] = useSegments();
  const { searchQuery, recentSearches, handleSearch, handleRecentSearches } =
    useApp();

  const KeywordItem = ({ item }: { item: RecentSearch }) => (
    <View style={[styles.keyword]}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.keyword_details]}
        onPress={() => {
          if (item?.keyword) {
            setSearch(item?.keyword);
            handleSearch(item?.keyword);
          }
        }}
      >
        <View
          style={[
            styles.keyword_icon,
            {
              backgroundColor: "#f3f3f3",
            },
          ]}
        >
          <MagnifyingGlass size={18} weight="bold" />
        </View>
        <Text style={{ flex: 1 }} numberOfLines={1}>
          {item?.keyword}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.closebtn]}
        onPress={() => {
          handleRecentSearches(item, "delete");
        }}
      >
        <X size={16} weight="bold" color={"#000"} />
      </TouchableOpacity>
    </View>
  );

  const RecentlySearchedCreator = ({ item }: { item: RecentSearch }) => (
    <View style={[styles.keyword]}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.keyword_details]}
        onPress={() => {
          handleRecentSearches(item, "add");
          // navigate to creator profile
          router.push(`/${segment}/${item?.creator?.address ?? ""}` as any);
        }}
      >
        <View
          style={[
            styles.keyword_icon,
            {
              backgroundColor: "#f3f3f3",
            },
          ]}
        >
          <Image
            transition={100}
            contentFit="cover"
            style={[
              {
                width: "100%",
                height: "100%",
                borderRadius: 50,
              },
            ]}
            placeholder={"LKN]Rv%2Tw=w]~RBVZRi};RPxuwH"}
            source={{
              uri: item?.creator?.image_url,
            }}
          />
        </View>
        <View
          style={{
            gap: 4,
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text style={{}} numberOfLines={1}>
            {item?.creator?.moniker}
          </Text>

          {item?.creator?.subscription_type && (
            <Text
              style={{ color: "#666", fontSize: 11, lineHeight: 11 }}
              numberOfLines={1}
            >
              {item?.creator?.subscription_type === "free"
                ? "Free"
                : item?.creator?.subscription_type === "monetary"
                ? "Paid"
                : "NFT Pass"}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.closebtn]}
        onPress={() => {
          handleRecentSearches(item, "delete");
        }}
      >
        <X size={16} weight="bold" color={"#000"} />
      </TouchableOpacity>
    </View>
  );

  const SearchedCreator = ({ item }: { item: RecentSearchCreator }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.keyword_details]}
      onPress={() => {
        handleRecentSearches(
          {
            type: "creator",
            id: item?.id || "",
            creator: item,
          },
          "add"
        );
        // navigate to creator profile
        router.push(`/${segment}/${item?.address ?? ""}` as any);
      }}
    >
      <View
        style={[
          styles.keyword_icon,
          {
            backgroundColor: "#f3f3f3",
          },
        ]}
      >
        <Image
          transition={100}
          contentFit="cover"
          style={[
            {
              width: "100%",
              height: "100%",
              borderRadius: 50,
            },
          ]}
          placeholder={"LKN]Rv%2Tw=w]~RBVZRi};RPxuwH"}
          source={{
            uri: item?.image_url,
          }}
        />
      </View>
      <View
        style={{
          gap: 4,
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Text style={{}} numberOfLines={1}>
          {item?.moniker}
        </Text>

        {item?.subscription_type && (
          <Text
            style={{
              color: "#666",

              fontSize: 11,
              lineHeight: 11,
            }}
            numberOfLines={1}
          >
            {item?.subscription_type === "free"
              ? "Free account"
              : item?.subscription_type === "monetary"
              ? "Paid account"
              : "NFT Pass"}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.overlay, { backgroundColor: "#fff" }]}>
      <ScrollView
        keyboardShouldPersistTaps="never"
        style={[styles.historyContainer]}
      >
        {searchQuery?.error ||
        searchQuery.loading ||
        (searchQuery?.data !== null && searchQuery?.data?.length == 0) ? (
          <EmptyState
            errorIcon={<SearchX size={30} color={"#555"} strokeWidth={1.4} />}
            error={searchQuery?.error}
            isLoading={searchQuery?.loading}
            data={{
              loadingText: "Searching...",
              message: "No results found",
              errorMessage: "An error occured while searching",
            }}
          />
        ) : searchQuery?.data?.length ?? 0 > 0 ? (
          <>
            {searchQuery?.data?.map((item, index) => {
              return (
                <Fragment key={index}>
                  <SearchedCreator key={item?.id} item={item} />
                </Fragment>
              );
            })}
          </>
        ) : (
          <View
            style={[
              styles.searched_keywords,
              {
                borderColor: "#eee",
              },
            ]}
          >
            {(recentSearches?.length ?? 0) > 0 && <Text>Recent</Text>}
            {recentSearches?.map((item, index) => {
              return (
                <Fragment key={index}>
                  {item?.type === "keyword" ? (
                    <KeywordItem key={nanoid()} item={item} />
                  ) : (
                    <RecentlySearchedCreator key={nanoid()} item={item} />
                  )}
                </Fragment>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchHistory;
