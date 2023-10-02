import React from "react";
import { router } from "expo-router";
import { styles } from "./details.styles";
import { Text, TouchableOpacity, View } from "react-native";
import { ArrowLeft } from "phosphor-react-native";
import { Container } from "components/_ui/custom";

const UploadDetails = () => {
  return (
    <Container style={[{ backgroundColor: "#0e0e0e" }]}>
      <View
        style={[
          styles.suggestions_header,
          {
            borderBottomWidth: 1,
            borderColor: "#333",
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            router.canGoBack() ? router.back() : router.push("/(tabs)/home");
          }}
          style={styles.backBtn}
        >
          <ArrowLeft weight="bold" size={18} color="#fff" />
        </TouchableOpacity>

        <Text
          style={[
            styles.suggestions_header__title,
            {
              color: "#fff",
            },
          ]}
        >
          Details
        </Text>
        <View style={[{ width: 18 }]} />
      </View>
    </Container>
  );
};

export default UploadDetails;
