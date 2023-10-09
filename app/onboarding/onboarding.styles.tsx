import Layout from "constants/Layout";
import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";
import { primaryColor } from "constants/Colors";

const styles = StyleSheet.create({
  header: {
    gap: 14,
    ...padding(40, 16, 16),
  },
  headerTitle: {
    fontSize: 30,
  },
  headerSubtitle: {
    fontSize: 14,
  },

  avatarsContainer: {
    // height: 150,
    ...padding(24, 0, 34),
    flexDirection: "column",
    width: Layout.window.width,
  },
  usernameContainer: {
    gap: 16,
    flex: 1,
    paddingHorizontal: 16,
  },

  inputContainer: {
    gap: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
  },

  domainNameToggle: {
    width: "100%",
    ...padding(10, 12),
    flexDirection: "row",
    alignItems: "center",
  },

  continueBtn: {
    height: 46,
    width: "100%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
