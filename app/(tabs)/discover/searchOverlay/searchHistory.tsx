import Creator from "../components/creator";
import { Keyboard, View } from "react-native";
import { styles } from "./searchOverlay.styles";
import { primaryColor } from "constants/Colors";
import { RgText } from "components/ui/typography";
import { ArrowUpLeft, MagnifyingGlass } from "phosphor-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SearchHistory = () => {
  return (
    <View style={[styles.historyContainer]}>
      <View
        style={[
          styles.searched_keywords,
          {
            borderColor: "#eee",
          },
        ]}
      >
        {[1, 2, 3, 4]?.map((i, ind) => {
          return (
            <View key={ind} style={[styles.keyword]}>
              <View key={ind} style={[styles.keyword_details]}>
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
                <RgText>Pinky 456</RgText>
              </View>

              <ArrowUpLeft size={18} weight="bold" color={primaryColor} />
            </View>
          );
        })}
      </View>

      <View style={[styles.searched_profiles]}>
        {[1, 2, 3]?.map((i, ind) => {
          return (
            <View key={ind}>
              <Creator item={"item"} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default SearchHistory;
