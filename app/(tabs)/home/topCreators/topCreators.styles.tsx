import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  topCreators: {
    width: "100%",
    ...padding(24, 0, 0),
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
    fontSize: 18,
    lineHeight: 18,
  },
  backBtn: {
    width: 34,
    height: 34,
    flexDirection: "row",
    alignItems: "center",
  },

  // creators
  creatorsList: {
    paddingTop: 16,
    flexDirection: "row",
  },
  creators: {
    gap: 14,
    width: "100%",
    paddingHorizontal: 16,
    flexDirection: "column",
  },

  // creator
  creatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  creator: {
    flexDirection: "row",
    alignItems: "center",
  },

  subscribeBtn: {
    borderRadius: 30,
    ...padding(8, 0),
    alignItems: "center",
    justifyContent: "center",
  },

  creatorAvatar: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 30,
    position: "relative",
    backgroundColor: "#ddd",
  },
  creatorAvatar_badge: {
    top: -3,
    right: -2,
    width: 24,
    zIndex: 1,
    height: 24,
    borderRadius: 30,
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
  },
  creatorAvatar_image: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  creatorInfo: {
    gap: 8,
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
