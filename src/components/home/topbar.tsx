import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Text } from "components/_ui/typography";
import { ChevronDown } from "lucide-react-native";
import { Bell, QrCode } from "phosphor-react-native";
import { useAccount } from "providers/AccountProvider";

import {
  Menu,
  renderers,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";

const Topbar = () => {
  const { userData, disconnect } = useAccount();

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

      <Menu
        renderer={renderers.Popover}
        rendererProps={{
          placement: "bottom",
        }}
      >
        <MenuTrigger
          customStyles={{
            triggerTouchable: {
              activeOpacity: 0.6,
              underlayColor: "transparent",
            },
          }}
        >
          <View style={[styles.account]}>
            <View style={[styles.avatar]}>
              <Image
                transition={100}
                contentFit="cover"
                style={{
                  width: "100%",
                  height: "100%",
                }}
                placeholder={"LKN]Rv%2Tw=w]~RBVZRi};RPxuwH"}
                source={{
                  uri: userData?.image_url,
                }}
              />
            </View>
            <Text style={{ fontSize: 15 }}>{userData?.moniker}</Text>
            <ChevronDown size={17} color="#000" strokeWidth={2.6} />
          </View>
        </MenuTrigger>

        <MenuOptions
          optionsContainerStyle={{
            shadowOffset: {
              width: 0,
              height: 0,
            },
            marginTop: 4,
            elevation: 0,
            borderWidth: 1,
            maxHeight: 270,
            borderRadius: 14,
            borderColor: "#ccc",
            backgroundColor: "#fff",
            shadowColor: "transparent",
          }}
          customStyles={{
            optionsWrapper: {
              borderRadius: 14,
              overflow: "hidden",
            },
          }}
        >
          <MenuOption
            onSelect={() => {
              disconnect();
            }}
            customStyles={{
              optionWrapper: {
                paddingVertical: 12,
                borderBottomWidth: 0,
                paddingHorizontal: 14,
                borderColor: "#e4e4e4",
              },
            }}
          >
            <Text>Disconnect Wallet</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>

      <Bell size={20} color="#000" />
    </View>
  );
};

export default Topbar;

const styles = StyleSheet.create({
  topbar: {
    paddingTop: 10,
    paddingBottom: 16,
    borderBottomWidth: 1,
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
    width: 20,
    height: 20,
    marginRight: 4,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#ddd",
  },
});
