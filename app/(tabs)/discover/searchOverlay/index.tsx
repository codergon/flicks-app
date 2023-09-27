import { Keyboard, View } from "react-native";
import SearchHistory from "./searchHistory";
import SearchResults from "./searchResults";
import { styles } from "./searchOverlay.styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SearchOverlay = ({ search = "" }) => {
  return (
    <View
      onTouchStart={() => Keyboard.dismiss()}
      style={[styles.overlay, { backgroundColor: "#fff" }]}
      // contentContainerStyle={[
      //   {
      //     flexGrow: 1,
      //   },
      // ]}
    >
      {!true ? <SearchHistory /> : <SearchResults />}
    </View>
  );
};

export default SearchOverlay;
