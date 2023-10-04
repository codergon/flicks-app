import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
  },

  profileHeader: {
    width: "100%",
  },
  banner: {
    width: "100%",
    height: 200,
  },
  bannerImg: {
    width: "100%",
    height: "100%",
  },

  userDetails: {
    flexDirection: "row",
    paddingHorizontal: 17,
  },

  // creator
  creator: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 70,
    position: "relative",
    backgroundColor: "#ddd",
  },
  avatar_image: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },

  info_actions: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  creatorInfo: {
    gap: 8,
    flexDirection: "column",
  },
  creatorInfo__name: {
    fontSize: 16,
    lineHeight: 16,
  },
  creatorInfo__desc: {
    fontSize: 12,
    lineHeight: 12,
  },

  actionBtns: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  bio: {
    width: "100%",
    marginTop: 12,
    flexDirection: "row",
    paddingHorizontal: 16,
  },
});

export default styles;
