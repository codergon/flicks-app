import { Image } from "expo-image";
import { padding } from "helpers/styles";
import { primaryColor } from "constants/colors";
import { MoreVertical } from "lucide-react-native";
import { Eye, Lock, Star } from "phosphor-react-native";
import { RgText, Text } from "components/_ui/typography";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import dayjs from "dayjs";
import { router } from "expo-router";

interface ContentProps {
  item: any;
  isLastItem?: boolean;
}

const LiveStreamItem = ({ item, isLastItem = false }: ContentProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        router.push({
          pathname: `/livestream/`,
          params: { streamId: item.id, streamDetails: JSON.stringify(item) },
        });
      }}
      style={[
        styles.content,
        {
          borderColor: "#f4f4f4",
          marginBottom: isLastItem ? 20 : 0,
          borderBottomWidth: isLastItem ? 0 : 1,
        },
      ]}
    >
      {/* <View
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
          source={{ blurhash: "LIG+2d-;yDv{P;s+MvVrv0WF+FOt" }}
        />
      </View> */}

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
            {item?.start && dayjs(item?.start).format("h:mm A")}
          </Text>

          {false && (
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
          )}
        </View>

        <View
          style={{
            gap: 4,
            marginBottom: 4,
            overflow: "hidden",
            flexDirection: "column",
          }}
        >
          <Text numberOfLines={2} style={[styles.title]}>
            {item?.title}
          </Text>
          <RgText numberOfLines={2} style={[styles.description]}>
            {item?.description}
          </RgText>
        </View>
      </View>

      {/* <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.moreBtn]}
        onPress={() => {}}
      >
        <MoreVertical size={18} color="#676C75" />
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
};

export default LiveStreamItem;

const styles = StyleSheet.create({
  content: {
    gap: 16,
    ...padding(14, 0),
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
    gap: 4,
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
  },
  description: {
    fontSize: 13,
    lineHeight: 16,
    color: "#676C75",
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
