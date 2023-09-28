import SearchHistory from "./searchHistory";
import SearchResults from "./searchResults";
import { Keyboard, View } from "react-native";
import { styles } from "./searchOverlay.styles";

const SearchOverlay = ({ search = "" }) => {
  return (
    <View
      onTouchStart={() => Keyboard.dismiss()}
      style={[styles.overlay, { backgroundColor: "#fff" }]}
    >
      {true ? <SearchHistory /> : <SearchResults />}
    </View>
  );
};

export default SearchOverlay;
