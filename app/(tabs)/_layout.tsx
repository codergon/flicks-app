import { Tabs } from "expo-router";
import Colors from "constants/Colors";
import Icons from "components/_common/Icons";
import useColorScheme from "hooks/useColorScheme";
import { useModals } from "contexts/ModalsContext";
import { TouchableOpacity, View } from "react-native";

function TabBarIcon(props: { label: string; color: string }) {
  return (
    <View
      style={{
        width: 45,
        alignItems: "center",
        justifyContent: "center",
        marginTop: props.label === "create" ? 8 : 0,
      }}
    >
      {props.label === "home" ? (
        <Icons.Home size={22} color={props.color} />
      ) : props.label === "discover" ? (
        <Icons.Discover size={22} color={props.color} />
      ) : props.label === "live" ? (
        <Icons.Broadcast size={21} color={props.color} />
      ) : props.label === "account" ? (
        <Icons.Wallet size={22} color={props.color} />
      ) : (
        <Icons.Create size={30} color={props.color} />
      )}
    </View>
  );
}

export const unstable_settings = {
  initialRouteName: "(home)",
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { openCreateContentModal } = useModals();

  return (
    <Tabs
      initialRouteName="(home)"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontFamily: "DMSans-Medium",
        },
        tabBarStyle: {
          height: 84,
          paddingTop: 6,
          borderTopWidth: 1,
          borderTopColor: Colors[colorScheme].tabBorder,
          backgroundColor: Colors[colorScheme].tabBackground,
        },
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon label="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(discover)"
        options={{
          title: "Discover",
          tabBarIcon: ({ color }) => (
            <TabBarIcon label="discover" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          // href: null, // hides this route
          title: "",
          tabBarButton: (props) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  openCreateContentModal();
                }}
                style={{
                  flex: 1,
                  minWidth: 25,
                  paddingTop: 5,
                  height: "100%",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  backgroundColor: "transparent",
                }}
              >
                <Icons.Create size={30} color={"#000"} />
              </TouchableOpacity>
            );
          },
          tabBarIcon: ({ color }) => (
            <TabBarIcon label="create" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(live)"
        options={{
          title: "Live",
          tabBarIcon: ({ color }) => <TabBarIcon label="live" color={color} />,
        }}
      />

      <Tabs.Screen
        name="(account)"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <TabBarIcon label="account" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
