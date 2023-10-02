import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // suggestions header
  suggestions_header: {
    flexDirection: "row",
    alignItems: "center",
    ...padding(14, 16, 10),
    justifyContent: "space-between",
  },
  suggestions_header__title: {
    fontSize: 18,
    lineHeight: 18,
  },
  backBtn: {
    width: 34,
    height: 34,
    flexDirection: "row",
    alignItems: "center",
  },
});
