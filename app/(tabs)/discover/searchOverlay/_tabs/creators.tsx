import { padding } from "helpers/styles";
import Creator from "../../components/creator";
import { primaryColor } from "constants/Colors";
import { StyleSheet, View } from "react-native";
import { Text } from "components/ui/typography";

const CreatorsTab = () => {
  return (
    <View style={[styles.creators_results]}>
      {[1, 2, 3]?.map((i, ind) => {
        const isSubscribed = ind % 4 == 0;

        return (
          <View key={ind} style={[styles.creatorContainer]}>
            <Creator item={"item"} />

            <View style={[styles.subscribeBtn]}>
              <Text
                style={{
                  fontSize: 12,
                  color: isSubscribed ? "#80848C" : primaryColor,
                }}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default CreatorsTab;

const styles = StyleSheet.create({
  creators_results: {
    flex: 1,
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "column",
  },

  // creator
  creatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subscribeBtn: {
    borderRadius: 30,
    ...padding(8, 0),
    alignItems: "center",
    justifyContent: "center",
  },
});
