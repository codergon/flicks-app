import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  // Header
  header: {
    gap: 16,
    width: "100%",
    ...padding(18, 18, 14),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // chains
  chains: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
  },

  preferredChain: {
    flexDirection: "column",
  },
});
