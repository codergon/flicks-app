import { Image } from "expo-image";
import { padding } from "helpers/styles";
import { primaryColor } from "constants/Colors";
import { MoreVertical } from "lucide-react-native";
import { Eye, Lock, Star } from "phosphor-react-native";
import { RgText, Text } from "components/_ui/typography";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ContentProps {
  item: any;
  showBorder?: boolean;
}

const LiveStreamItem = ({ item, showBorder = true }: ContentProps) => {
  return (
    <View
      style={[
        styles.content,
        {
          borderColor: "#f4f4f4",
          // borderBottomWidth: showBorder ? 1 : 0,
        },
      ]}
    >
      <View
        style={[
          styles.imageContainer,
          {
            backgroundColor: "#f4f4f4",
          },
        ]}
      >
        <Image
          transition={300}
          contentFit="cover"
          style={[styles.image]}
          source={require("assets/images/mock/19.png")}
        />
      </View>

      <View style={[styles.details]}>
        <View
          style={{
            maxHeight: 40,
            marginBottom: 2,
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          <Text
            numberOfLines={1}
            style={[
              styles.date,
              {
                color: "#676C75",
              },
            ]}
          >
            13:00PM
          </Text>

          <>
            <Text
              numberOfLines={1}
              style={[
                styles.date,
                {
                  color: "#676C75",
                  marginHorizontal: 8,
                },
              ]}
              children="•"
            />
            {item?.type !== "free" ? (
              <Lock size={13} color={primaryColor} weight="fill" />
            ) : (
              <Star size={13} color={primaryColor} weight="fill" />
            )}
            <Text
              numberOfLines={1}
              style={[
                styles.date,
                {
                  marginLeft: 4,
                  color: "#676C75",
                },
              ]}
            >
              {item?.type === "free" ? "Free" : "Paid"}
            </Text>
          </>
        </View>

        <View
          style={{
            maxHeight: 40,
            marginBottom: 4,
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          <Text numberOfLines={2} style={[styles.title]}>
            How to be a content creator based on true story.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.moreBtn]}
        onPress={() => {}}
      >
        <MoreVertical size={18} color="#676C75" />
      </TouchableOpacity>
    </View>
  );
};

export default LiveStreamItem;

const styles = StyleSheet.create({
  content: {
    gap: 16,
    ...padding(10, 20),
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
  },

  imageContainer: {
    width: 78,
    height: 78,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },

  details: {
    gap: 6,
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
  },
  date: {
    fontSize: 13,
  },

  moreBtn: {
    zIndex: 99,
    alignItems: "center",
    ...padding(6, 0, 12, 10),
    justifyContent: "center",
  },
});
