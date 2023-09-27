import { Image } from "expo-image";
import Layout from "constants/Layout";
import styles from "./suggestions.styles";
import { FlatList, TouchableOpacity, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RgText, Text } from "components/ui/typography";
import { router } from "expo-router";

const SuggestedAccounts = () => {
  return (
    <View style={[styles.suggestions]}>
      <View style={[styles.suggestions_header]}>
        <Text style={[styles.suggestions_header__title]}>
          Suggested Accounts
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/home/suggestedAccounts")}
          style={styles.expandBtn}
        >
          <ChevronRight size={20} color="#000" strokeWidth={2.4} />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        pagingEnabled
        data={[1, 2, 3, 4]}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={[styles.creatorsList]}
        snapToInterval={Math.max(Layout.window.width * 0.6, 250) + 16}
        ItemSeparatorComponent={() => <View style={[styles.itemSeperator]} />}
        renderItem={({ item, index }) => {
          return (
            <View key={index} style={[styles.creator_container]}>
              <Image
                transition={300}
                contentFit="cover"
                style={[styles.backgroundImage]}
                source={require("assets/images/mock/1.png")}
              />

              <LinearGradient
                key={index}
                locations={[0.1563, 1]}
                style={[styles.creator_cover]}
                colors={["transparent", "rgba(0,0,0,0.64)"]}
              >
                <View key={index} style={[styles.creator]}>
                  <View
                    style={[
                      styles.creatorAvatar,
                      {
                        borderColor: "#fff",
                      },
                    ]}
                  >
                    <Image
                      style={[styles.creatorAvatar_image]}
                      source={require("assets/images/mock/1.png")}
                      placeholder={
                        "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["
                      }
                      contentFit="cover"
                      transition={300}
                    />
                  </View>
                  <View style={[styles.creatorInfo]}>
                    <Text
                      style={[
                        styles.creatorInfo__name,
                        {
                          color: "#fff",
                        },
                      ]}
                    >
                      kim_berly21
                    </Text>
                    <RgText
                      style={[
                        styles.creatorInfo__desc,
                        {
                          color: "#fff",
                        },
                      ]}
                    >
                      11k subscribers
                    </RgText>
                  </View>
                </View>
              </LinearGradient>
            </View>
          );
        }}
      />
    </View>
  );
};

export default SuggestedAccounts;
