import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Header
  header: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
    ...padding(14, 16, 10),
    justifyContent: "space-between",
  },
  headeTitle: {
    fontSize: 18,
    lineHeight: 18,
  },
  backBtn: {
    width: 34,
    height: 34,
    flexDirection: "row",
    alignItems: "center",
  },
  cancelSearch: {
    padding: 8,
  },

  discover_body: {
    flex: 1,
    position: "relative",
  },

  // Content list
  listContainer: {
    flexGrow: 1,
    marginTop: 8,
    paddingBottom: 60,
    paddingHorizontal: 13,
  },

  // Loading
  loadingText: {
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  // Lottie animation
  lottieView: {
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
  },
});
