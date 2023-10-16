import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    paddingTop: 4,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  creatorInfo: {
    gap: 4,
    flexDirection: "column",
  },
  creatorInfo__name: {
    fontSize: 16,
  },
  creatorInfo__desc: {
    fontSize: 12,
  },

  actionBtns: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  bio: {
    width: "100%",
    marginTop: 12,
    flexDirection: "row",
    paddingHorizontal: 16,
  },

  // account stats
  accountStats: {
    gap: 10,
    width: "100%",
    marginTop: 6,
    paddingTop: 10,
    paddingBottom: 14,
    flexDirection: "column",
  },
  stats_row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },

  stats_group: {
    gap: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  statBtn_cover: {
    // alignItems: "center",
    flexDirection: "column",
  },
  statBtn: {
    gap: 8,
    borderRadius: 32,
    paddingVertical: 9,
    paddingHorizontal: 11,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  nftSubscription: {
    gap: 5,
    flex: 1,
    paddingTop: 2,
    paddingRight: 16,
    flexDirection: "row",
  },
  nftImage: {
    width: 16,
    height: 16,
    marginLeft: 4,
    borderRadius: 40,
    overflow: "hidden",
  },
  nftImage_img: {
    width: "100%",
    height: "100%",
  },
});

export default styles;
