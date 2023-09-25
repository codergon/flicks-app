import { Tabs } from "expo-router";
import { View } from "react-native";
import Colors from "../../constants/Colors";
import Icons from "components/common/Icons";
import useColorScheme from "hooks/useColorScheme";

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

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="home"
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
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon label="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
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
          tabBarIcon: ({ color }) => (
            <TabBarIcon label="create" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="live"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon label="live" color={color} />,
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon label="account" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}