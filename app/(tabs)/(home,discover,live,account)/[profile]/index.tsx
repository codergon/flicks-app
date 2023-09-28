import { Container } from "components/_ui/custom";
import { Text } from "components/_ui/typography";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

const UserProfile = () => {
  const { profile } = useLocalSearchParams<{ profile: string }>();

  return (
    <Container>
      <Text>User Profile</Text>
    </Container>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
