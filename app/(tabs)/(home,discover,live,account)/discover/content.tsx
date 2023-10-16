import Post from "components/shared/post";
import { styles } from "./discover.styles";
import { Text } from "components/_ui/typography";
import { Container } from "components/_ui/custom";
import { ArrowLeft } from "phosphor-react-native";
import { TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

const ExpandedContentView = () => {
  const { post } = useLocalSearchParams();

  return (
    <Container>
      <View
        style={[
          styles.header,
          {
            borderBottomWidth: 1,
            borderColor: "#ececec",
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            router.canGoBack() ? router.back() : router.push("/(tabs)/home");
          }}
          style={styles.backBtn}
        >
          <ArrowLeft weight="bold" size={18} color="#000" />
        </TouchableOpacity>

        <Text style={[styles.headeTitle]}>Discover</Text>
        <View style={[{ width: 18 }]} />
      </View>

      <Post post={JSON.parse(post as any)} showInteractions={false} />
    </Container>
  );
};

export default ExpandedContentView;
