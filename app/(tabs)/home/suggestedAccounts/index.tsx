import { router } from "expo-router";
import Creator from "../components/creator";
import styles from "./suggestedAccounts.styles";
import { primaryColor } from "constants/Colors";
import { Container } from "components/ui/custom";
import { ArrowLeft } from "phosphor-react-native";
import { RgText, Text } from "components/ui/typography";
import { ScrollView, TouchableOpacity, View } from "react-native";

const SuggestedAccounts = () => {
  return (
    <Container>
      <View
        style={[
          styles.suggestions,
          {
            backgroundColor: "#fff",
          },
        ]}
      >
        <View style={[styles.suggestions_header]}>
          <TouchableOpacity
            onPress={() => {
              router.canGoBack() ? router.back() : router.push("/(tabs)/home");
            }}
            style={styles.backBtn}
          >
            <ArrowLeft weight="bold" size={18} color="#000" />
          </TouchableOpacity>

          <Text style={[styles.suggestions_header__title]}>
            Suggested Accounts
          </Text>
          <View style={[{ width: 18 }]} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.creatorsList]}
        >
          <View style={[styles.creators]}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
              const isSubscribed = index % 4 == 0;

              return (
                <View key={index} style={[styles.creatorContainer]}>
                  <Creator key={index} item={item.toString()} />

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
        </ScrollView>
      </View>
    </Container>
  );
};

export default SuggestedAccounts;
