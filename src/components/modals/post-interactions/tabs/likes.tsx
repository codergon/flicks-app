import { padding } from "helpers/styles";
import Creator from "components/shared/creator";
import { Text } from "components/_ui/typography";
import { primaryColor } from "constants/Colors";
import { FlatList, StyleSheet, View } from "react-native";

const LikesTab = () => {
  return (
    <View style={[styles.container]}>
      <FlatList
        data={Array.from({ length: 20 })}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const isSubscribed = index % 4 == 0;

          return (
            <View style={[styles.creatorContainer]}>
              <Creator size={40} item={"item"} />

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
        }}
        ItemSeparatorComponent={() => (
          <View style={{ height: 14, width: "100%" }} />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
      />
    </View>
  );
};

export default LikesTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
