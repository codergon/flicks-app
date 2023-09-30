import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    gap: 16,
    flex: 1,
    alignItems: "center",
    ...padding(24, 0, 36),
    justifyContent: "flex-end",
  },

  // Header
  header: {
    width: "100%",
    ...padding(0, 18),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "red",
  },

  // Options
  options: {
    width: "100%",
    flexDirection: "column",
  },
  option: {
    gap: 12,
    width: "100%",
    ...padding(10, 16),
    flexDirection: "row",
    alignItems: "center",
  },
  option_icon: {
    width: 46,
    height: 46,
    borderRadius: 46,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
