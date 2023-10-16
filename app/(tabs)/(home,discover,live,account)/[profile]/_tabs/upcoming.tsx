import { StyleSheet, View } from "react-native";
import { Text } from "components/_ui/typography";
import { Tabs } from "react-native-collapsible-tab-view";
import LiveStreamItem from "components/account/streamItem";

const ProfileUpcomingStreams = () => {
  const data = [
    {
      id: 1,
      type: "free",
    },
    {
      id: 2,
      type: "paid",
    },
  ];

  return (
    <Tabs.ScrollView
      style={[styles.ongoingStreams]}
      contentContainerStyle={{
        paddingTop: 0,
        paddingBottom: 60,
      }}
    >
      {[1, 3, 4].map((group, ind) => {
        return (
          <View
            key={ind}
            style={[
              styles.groupedStreams,
              {
                marginTop: 30,
              },
            ]}
          >
            <View
              style={{
                gap: 5,
                marginBottom: 6,
                paddingHorizontal: 16,
                flexDirection: "column",
              }}
            >
              <Text
                style={[
                  {
                    fontSize: 14,
                    color: "#676C75",
                  },
                ]}
              >
                Wednesday
              </Text>
              <Text
                style={[
                  {
                    fontSize: 20,
                    color: "#000",
                  },
                ]}
              >
                September 20
              </Text>
            </View>

            {data?.map((item, index) => {
              return (
                <LiveStreamItem
                  item={item}
                  key={index + ind}
                  showBorder={index !== data.length - 1}
                />
              );
            })}
          </View>
        );
      })}
    </Tabs.ScrollView>
  );
};

export default ProfileUpcomingStreams;

const styles = StyleSheet.create({
  ongoingStreams: {
    flex: 1,
    flexDirection: "column",
  },

  groupedStreams: {
    width: "100%",
  },
});
