import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    ...padding(14, 20, 10),
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
  },

  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
  },
});
