import { StyleSheet, View } from "react-native";
import { Text } from "components/_ui/typography";
import { ChevronDown } from "lucide-react-native";
import { Bell, QrCode } from "phosphor-react-native";

const Topbar = () => {
  return (
    <View
      style={[
        styles.topbar,
        {
          borderColor: "#ececec",
        },
      ]}
    >
      <QrCode size={24} color="#000" />
      <View style={[styles.account]}>
        <View style={[styles.avatar]}></View>
        <Text>alphaknight</Text>
        <ChevronDown size={17} color="#000" strokeWidth={2.6} />
      </View>
      <Bell size={20} color="#000" />
    </View>
  );
};

export default Topbar;

const styles = StyleSheet.create({
  topbar: {
    borderBottomWidth: 1,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },

  account: {
    gap: 2,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 16,
    height: 16,
    marginRight: 4,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#ddd",
  },
});
