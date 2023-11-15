import { Text } from "components/_ui/typography";
import LiveStreamItem from "components/streams/streamItem";
import { ScrollView, StyleSheet, View } from "react-native";

const UpcomingStreams = () => {
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
                marginBottom: 16,
                paddingHorizontal: 20,
                flexDirection: "column",
              }}
            >
              <Text
                style={[
                  {
                    fontSize: 16,
                    color: "#676C75",
                  },
                ]}
              >
                Wednesday
              </Text>
              <Text
                style={[
                  {
                    fontSize: 28,
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

export default UpcomingStreams;

const styles = StyleSheet.create({
  ongoingStreams: {
    flex: 1,
    flexDirection: "column",
  },

  groupedStreams: {
    width: "100%",
  },
});
