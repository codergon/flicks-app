import { Image } from "expo-image";
import { router } from "expo-router";
import { padding } from "helpers/styles";
import { primaryColor } from "constants/colors";
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
          source={require("assets/images/mock/1.png")}
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

        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.creator]}
            onPress={() => {
              router.push(`/(tabs)/(live)/2345`);
            }}
          >
            <View style={[styles.creatorAvatar]}>
              <Image
                transition={300}
                contentFit="cover"
                style={[styles.creatorAvatar_image]}
                source={require("assets/images/mock/1.png")}
              />
            </View>
            <View style={[styles.creatorInfo]}>
              <Text style={[styles.creatorInfo__name]}>Armani Cooper</Text>
            </View>
          </TouchableOpacity>

          {item?.attendees && Number(item?.attendees) !== 0 && (
            <View style={[styles.attendees]}>
              <Eye size={14} color="#676C75" weight="bold" />
              <RgText style={{ fontSize: 12 }}>{item?.attendees}</RgText>
            </View>
          )}
        </View>
      </View>
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
    width: 92,
    height: 104,
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

  // creator
  creator: {
    flexDirection: "row",
    alignItems: "center",
  },
  creatorAvatar: {
    width: 18,
    height: 18,
    marginRight: 6,
    borderRadius: 30,
    position: "relative",
    backgroundColor: "#ddd",
  },
  creatorAvatar_image: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  creatorInfo: {
    gap: 8,
    flexDirection: "column",
  },
  creatorInfo__name: {
    fontSize: 13,
  },

  attendees: {
    gap: 4,
    borderRadius: 12,
    ...padding(2, 4),
    flexDirection: "row",
    alignItems: "center",
  },
});
