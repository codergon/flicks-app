import { Image } from "expo-image";
import { router } from "expo-router";
import { padding } from "helpers/styles";
import { primaryColor } from "constants/Colors";
import { RgText } from "components/_ui/typography";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

const TipsTab = () => {
  return (
    <View style={[styles.container]}>
      <FlatList
        data={Array.from({ length: 20 })}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View style={[styles.itemContainer]}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.user]}
                onPress={() => {
                  router.push(`/(tabs)/(home)/2345`);
                }}
              >
                <Image
                  style={[styles.userImage]}
                  source={require("assets/images/mock/1.png")}
                  contentFit="cover"
                  transition={300}
                />
              </TouchableOpacity>

              <View
                style={{
                  gap: 5,
                  flex: 1,
                  flexDirection: "column",
                }}
              >
                <RgText style={[styles.title]}>
                  <RgText
                    onPress={() => {
                      router.push(`/(tabs)/(home)/2345`);
                    }}
                    style={[styles.title, { color: primaryColor }]}
                  >
                    @Nelson Parker
                  </RgText>{" "}
                  tipped a mug gift
                </RgText>

                <RgText
                  numberOfLines={1}
                  style={[
                    styles.date,
                    {
                      color: "#676C75",
                    },
                  ]}
                >
                  4hrs ago
                </RgText>
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

export default TipsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: "column",
  },

  // creator
  itemContainer: {
    gap: 12,
    flexDirection: "row",
  },
  subscribeBtn: {
    borderRadius: 30,
    ...padding(8, 0),
    alignItems: "center",
    justifyContent: "center",
  },

  user: {
    width: 32,
    height: 32,
    borderRadius: 30,
    position: "relative",
    backgroundColor: "#ddd",
  },
  userImage: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  title: {
    fontSize: 14,
  },
  date: {
    fontSize: 13,
    marginBottom: 2,
  },
});
