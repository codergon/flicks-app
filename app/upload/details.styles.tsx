import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    ...padding(8, 16, 8),
    justifyContent: "space-between",
  },
  header__title: {
    fontSize: 16,
  },
  backBtn: {
    width: 34,
    height: 34,
    flexDirection: "row",
    alignItems: "center",
  },

  body: {
    gap: 18,
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    flexDirection: "column",
  },
  mediaPreview: {
    height: 100,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  mediaThumbnail: {
    width: "100%",
    height: "100%",
  },
  previewOverlay: {
    top: 0,
    left: 0,
    zIndex: 3,
    width: "100%",
    height: "100%",
    ...padding(6, 12),
    position: "absolute",
  },
  previewOverlay_info: {
    gap: 6,
    borderRadius: 20,
    ...padding(4, 10),
    flexDirection: "row",
    alignItems: "center",
  },

  // Post Caption
  postCaption: {
    width: "100%",
    marginTop: 10,
    flexDirection: "column",
  },
  captionInput: {
    width: "100%",
    minHeight: 80,
    ...padding(10, 16),
  },

  // Post Settings
  postSettings: {
    gap: 8,
    width: "100%",
    marginTop: 20,
    flexDirection: "column",
  },
  postSettings__item: {
    gap: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postSettings__item_details: {
    gap: 5,
    flex: 1,
    paddingVertical: 10,
    flexDirection: "column",
  },
  priceInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
  },

  // Submit Button
  submitBtn: {
    height: 46,
    borderRadius: 30,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
