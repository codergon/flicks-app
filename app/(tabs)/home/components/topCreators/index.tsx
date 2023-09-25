import Creator from "../creator";
import { router } from "expo-router";
import styles from "./topCreators.styles";
import { Text } from "components/ui/typography";
import { ChevronRight } from "lucide-react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";

const TopCreators = () => {
  return (
    <View
      style={[
        styles.topCreators,
        {
          backgroundColor: "#fff",
        },
      ]}
    >
      <View style={[styles.topCreators_header]}>
        <Text style={[styles.topCreators_header__title]}>Top Creators</Text>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/home/topCreators")}
          style={styles.expandBtn}
        >
          <ChevronRight size={20} color="#000" strokeWidth={2.4} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.creatorsList]}
      >
        <View style={[styles.creators]}>
          {[1, 2, 3, 4, 5].map((item, index) => {
            return <Creator key={index} badge={item} item={item.toString()} />;
          })}
        </View>

        <View style={[styles.creators]}>
          {[6, 7, 8, 9, 10].map((item, index) => {
            return <Creator key={index} badge={item} item={item.toString()} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default TopCreators;
