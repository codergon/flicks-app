import Layout from "constants/Layout";
import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  suggestions: {
    width: "100%",
    ...padding(18, 0, 10),
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },

  // suggestions header
  suggestions_header: {
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  suggestions_header__title: {
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
    paddingHorizontal: 16,
  },
  itemSeperator: {
    width: 12,
    height: "100%",
    backgroundColor: "transparent",
  },

  // creator
  creator_container: {
    height: 160,
    minWidth: 250,
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "flex-end",
    width: Layout.window.width * 0.6,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },

  // Creator
  creator_cover: {
    zIndex: 2,
    width: "100%",
    height: "100%",
    position: "absolute",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  creator: {
    padding: 12,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  creatorAvatar: {
    width: 40,
    height: 40,
    borderWidth: 1,
    marginRight: 9,
    borderRadius: 30,
    position: "relative",
    backgroundColor: "#ddd",
  },
  creatorAvatar_image: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  creatorInfo: {
    gap: 6,
    paddingTop: 4,
    flexDirection: "column",
  },
  creatorInfo__name: {
    fontSize: 15,
    lineHeight: 15,
  },
  creatorInfo__desc: {
    fontSize: 12,
    lineHeight: 12,
  },
});

export default styles;
