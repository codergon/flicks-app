import { padding } from "helpers/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  post: {
    width: "100%",
    ...padding(18, 0, 10),
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});

export default styles;
