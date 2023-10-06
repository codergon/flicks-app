import Layout from "constants/Layout";
import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";
import { primaryColor } from "constants/Colors";

const styles = StyleSheet.create({
  post: {
    width: "100%",
    ...padding(18, 0, 10),
    flexDirection: "column",
    justifyContent: "flex-end",
  },

  // Post header
  post_header: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  post_creator: {
    flexDirection: "row",
    alignItems: "center",
  },
  post_creatorAvatar: {
    width: 42,
    height: 42,
    marginRight: 9,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#ddd",
  },
  post_creatorAvatar_image: {
    width: "100%",
    height: "100%",
  },
  post_creatorInfo: {
    gap: 8,
    paddingTop: 4,
    flexDirection: "column",
  },
  post_creatorInfo__name: {
    fontSize: 14,
    lineHeight: 14,
  },
  post_creatorInfo__time: {
    fontSize: 11,
    lineHeight: 11,
  },

  // Post text
  post_textContainer: {
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  post_text: {
    fontSize: 14,
    lineHeight: 22,
  },

  // Post media
  post_media: {
    width: "100%",
    position: "relative",
    flexDirection: "row",
  },
  post_mediaNumbers: {
    top: 10,
    right: 10,
    zIndex: 3,
    borderRadius: 20,
    ...padding(4, 12),
    position: "absolute",
  },

  subscribeBtn: {
    width: "100%",
    borderRadius: 16,
    ...padding(14, 16),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primaryColor,
  },

  post_mediaItems_container: {
    width: "100%",
  },
  post_mediaItems: {},

  post_mediaItem: {
    aspectRatio: 1,
    width: Layout.window.width,
    backgroundColor: "#f1f1f1",
  },

  // Locked Media
  post_mediaItem__locked: {
    gap: 10,
    padding: 32,
    aspectRatio: 1.5,
    alignItems: "center",
    flexDirection: "column",
    borderRightColor: "#ddd",
    justifyContent: "center",
  },
  post_mediaNumbers__locked: {
    gap: 5,
    left: 24,
    zIndex: 3,
    bottom: 24,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  mediaImage: {
    width: "100%",
    height: "100%",
  },
  mediaVideo: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },

  // Video Overlay
  videoOverlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "transparent",
  },
  playIcon: {
    width: 46,
    height: 46,
    top: "50%",
    left: "50%",
    borderRadius: 30,
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    transform: "translate(-16px, -16px)",
  },
  videoLength: {
    left: 10,
    zIndex: 3,
    bottom: 10,
    borderRadius: 20,
    ...padding(4, 12),
    position: "absolute",
    backgroundColor: "#000",
  },

  // Post footer
  post_footer: {
    alignItems: "center",
    position: "relative",
    flexDirection: "row",
    ...padding(9, 16, 13),
    justifyContent: "center",
  },
  // Post stats
  post_stats: {
    gap: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  post_statsItem: {
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  post_statsItemText: {
    fontSize: 13,
  },

  // Post MediaDots
  post_mediaDots: {
    gap: 6,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
  post_mediaDot: {
    width: 6,
    height: 6,
    borderRadius: 10,
    backgroundColor: "#ddd",
  },

  // Post actions
  post_actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  post_action: {
    flexDirection: "row",
  },
});

export default styles;
