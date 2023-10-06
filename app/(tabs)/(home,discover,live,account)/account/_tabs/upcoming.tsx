import { Text } from "components/_ui/typography";
import LiveStreamItem from "components/account/streamItem";
import { ScrollView, StyleSheet, View } from "react-native";

const AccountUpcomingStreams = () => {
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
    <ScrollView
      style={[styles.ongoingStreams]}
      contentContainerStyle={{
        paddingTop: 0,
        paddingBottom: 30,
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
    </ScrollView>
  );
};

export default AccountUpcomingStreams;

const styles = StyleSheet.create({
  ongoingStreams: {
    flex: 1,
    flexDirection: "column",
  },

  groupedStreams: {
    width: "100%",
  },
});
