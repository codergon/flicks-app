import { Fragment, useState } from "react";
import { styles } from "./discover.styles";
import SearchOverlay from "./searchOverlay";
import Content from "components/discover/content";
import { Container } from "components/_ui/custom";
import Searchbar from "components/_common/Searchbar";
import { RgText, Text } from "components/_ui/typography";
import { MagnifyingGlass } from "phosphor-react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import { Keyboard, TouchableOpacity, View } from "react-native";

const Discover = () => {
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);

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
        {true ? (
          <Fragment>
            <Searchbar
              value={search}
              onFocus={() => {
                setShowResults(true);
              }}
              onChangeText={setSearch}
            />
            {showResults && (
              <TouchableOpacity
                onPress={() => {
                  setShowResults(false);
                  setSearch("");
                  Keyboard.dismiss();
                }}
                style={styles.cancelSearch}
              >
                <RgText>Cancel</RgText>
              </TouchableOpacity>
            )}
          </Fragment>
        ) : (
          <>
            <Text style={[{ fontSize: 18 }]}>Discover</Text>
            <MagnifyingGlass size={18} weight="bold" />
          </>
        )}
      </View>

      <View style={styles.discover_body}>
        {showResults ? <SearchOverlay search={search} /> : null}

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
