import { View } from "react-native";
import Creator from "components/shared/creator";
import { styles } from "./searchOverlay.styles";
import { primaryColor } from "constants/Colors";
import { RgText } from "components/_ui/typography";
import { ScrollView } from "components/_ui/themed";
import { ArrowUpLeft, MagnifyingGlass } from "phosphor-react-native";

const SearchHistory = () => {
  return (
    <ScrollView style={[styles.historyContainer]}>
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
    </ScrollView>
  );
};

export default SearchHistory;
