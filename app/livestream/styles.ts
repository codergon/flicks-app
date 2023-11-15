import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#000",
  },
  innerContainer: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#111",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },

  videoView: {
    width: "100%",
    height: "100%",
  },

  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },

  // stream ui
  streamContainer: {
    top: 0,
    left: 0,
    gap: 10,
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    flexDirection: "column",
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },

  // stream body
  streamBody: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default styles;
