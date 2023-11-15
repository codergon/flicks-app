import Layout from "constants/layout";
import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  topCreators: {
    width: "100%",
    ...padding(24, 0),
    flexDirection: "column",
    justifyContent: "flex-end",
  },

  // topCreators header
  topCreators_header: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  topCreators_header__title: {
    fontSize: 16,
    lineHeight: 16,
  },
  expandBtn: {
    width: 34,
    height: 34,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  // creators
  creatorsList: {
    paddingVertical: 10,
    flexDirection: "row",
  },
  creators: {
    gap: 12,
    width: Layout.appWidth * 0.82,
    paddingHorizontal: 16,
    flexDirection: "column",
  },
});

export default styles;
