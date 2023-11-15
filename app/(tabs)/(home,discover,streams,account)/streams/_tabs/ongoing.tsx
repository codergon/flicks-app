import LiveStreamItem from "components/streams/streamItem";
import { FlatList, StyleSheet, View } from "react-native";

const OngoingStreams = () => {
  const data = [
    {
      id: 1,
      type: "free",
      attendees: 35,
    },
    {
      id: 2,
      type: "paid",
      attendees: 15,
    },
    {
      id: 3,
      type: "paid",
      attendees: 68,
    },
    {
      id: 4,
      type: "free",
      attendees: 4,
    },
    {
      id: 5,
      type: "paid",
      attendees: 545,
    },
  ];

  return (
    <View style={[styles.ongoingStreams]}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <LiveStreamItem
              item={item}
              showBorder={index !== data.length - 1}
            />
          );
        }}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 24,
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default OngoingStreams;

const styles = StyleSheet.create({
  ongoingStreams: {
    flex: 1,
    flexDirection: "column",
  },
});
