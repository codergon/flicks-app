import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    ...padding(0, 0, 36),
  },

  // Header
  header: {
    width: "100%",
    ...padding(18, 18, 14),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  //
  configs: {
    gap: 18,
    flex: 1,
    width: "100%",
    ...padding(10, 16),
    flexDirection: "column",
  },
  row: {
    gap: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row_details: {
    gap: 8,
    flex: 1,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  selectBtn: {
    gap: 6,
    // flex: 1,
    height: 38,
    borderWidth: 1,
    borderRadius: 44,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 18,
    justifyContent: "center",
  },
  selectbtn_text: {
    fontSize: 12,
  },

  input_cover: {
    gap: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  priceInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 14,
  },

  // Nfts
  selectedNft: {
    gap: 12,
    width: "100%",
    borderWidth: 1,
    borderRadius: 14,
    ...padding(10, 14),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // Submit Button
  submitBtn: {
    height: 46,
    width: "100%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
