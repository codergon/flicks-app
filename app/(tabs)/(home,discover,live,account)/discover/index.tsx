import { Fragment, useState } from "react";
import { styles } from "./discover.styles";
import Content from "components/discover/content";
import { Container } from "components/_ui/custom";
import { RgText } from "components/_ui/typography";
import Searchbar from "components/_common/Searchbar";
import SearchHistory from "./searchOverlay/searchHistory";
import MasonryList from "@react-native-seoul/masonry-list";
import { Keyboard, TouchableOpacity, View } from "react-native";
import { useApp } from "providers/AppProvider";

const Discover = () => {
  const [search, setSearch] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);

  const { setSearchQuery } = useApp();

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

        <MasonryList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          numColumns={3}
          renderItem={({ item, i }) => (
            <Fragment>
              <Content
                item={{
                  id: item,
                }}
              />
            </Fragment>
          )}
          onEndReachedThreshold={0.1}
          keyExtractor={(i) => i.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.listContainer]}

          // refreshing={isLoadingNext}
          // onEndReached={() => loadNext(ITEM_CNT)}
          // onRefresh={() => refetch({ first: ITEM_CNT })}
        />
      </View>
    </Container>
  );
};

export default Discover;
