import Layout from "constants/layout";
import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  content: {
    flex: 1 / 3,
    margin: 3,
    height: 180,
    borderRadius: 8,
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "flex-end",
  },

  contentType_Icon: {
    top: 4,
    right: 4,
    zIndex: 3,
    padding: 2,
    borderRadius: 20,
    position: "absolute",
  },

  mediaImage: {
    width: "100%",
    height: "100%",
  },
});

export default styles;
