import { nanoid } from "nanoid";
import { Image } from "expo-image";
import { RecentSearch } from "typings/common";
import { useApp } from "providers/AppProvider";
import { styles } from "./searchOverlay.styles";
import { primaryColor } from "constants/Colors";
import { Text } from "components/_ui/typography";
import { ScrollView } from "components/_ui/themed";
import { TouchableOpacity, View } from "react-native";
import EmptyState from "components/shared/emptyState";
import { MagnifyingGlass, X } from "phosphor-react-native";
import { SearchX } from "lucide-react-native";

interface SearchHistoryProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchHistory = ({ setSearch }: SearchHistoryProps) => {
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

  const CreatorItem = ({ item }: { item: RecentSearch }) => (
    <View style={[styles.keyword]}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.keyword_details]}
        onPress={() => {
          if (item?.keyword) {
            handleRecentSearches(item, "add");
            // navigate to creator profile
            //
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
            {"DeezNuts"}
            {/* {item?.creator?.moniker} */}
          </Text>

          {!item?.creator?.subscription_type && (
            <Text
              style={{ color: primaryColor, fontSize: 11, lineHeight: 11 }}
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

  console.log(searchQuery);

  return (
    <View style={[styles.overlay, { backgroundColor: "#fff" }]}>
      <ScrollView
        keyboardShouldPersistTaps="never"
        style={[styles.historyContainer]}
      >
        {searchQuery?.error ||
        searchQuery.loading ||
        (!!searchQuery?.data && searchQuery?.data?.length == 0) ? (
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
        ) : (
          <View
            style={[
              styles.searched_keywords,
              {
                borderColor: "#eee",
              },
            ]}
          >
            {recentSearches?.map((item, index) => {
              return (
                <>
                  {item?.type === "keyword" ? (
                    <KeywordItem key={nanoid()} item={item} />
                  ) : (
                    <CreatorItem key={nanoid()} item={item} />
                  )}
                </>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchHistory;
