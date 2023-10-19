import Timeline from "./Timeline";
import { Image } from "expo-image";
import { padding } from "helpers/styles";
import { useApp } from "providers/AppProvider";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { LightText, RgText } from "components/_ui/typography";

const CurrentUpload = () => {
  const {
    selectedMedia,
    currentUpload,
    uploadStatus,
    uploadError,
    cancelUpload,
    uploadContent,
  } = useApp();

  return (
    <View style={[styles.container, { borderColor: "#ddd" }]}>
      <RgText
        style={{
          fontSize: 13,
        }}
      >
        Uploading Content
      </RgText>

      <View style={[{ opacity: 0.5 }]}>
        {currentUpload?.caption && (
          <View style={[styles.post_textContainer]}>
            <LightText numberOfLines={2} style={[styles.post_text]}>
              {currentUpload?.caption} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Dolore nihil perspiciatis quidem?
            </LightText>
          </View>
        )}

        {selectedMedia?.length > 0 && (
          <View
            style={{
              height: 80,
              width: "100%",
              borderWidth: 1,
              borderRadius: 12,
              overflow: "hidden",
              borderColor: "#ddd",
              flexDirection: "row",
              backgroundColor: "#f4f4f4",
            }}
          >
            {selectedMedia?.map((media) => (
              <View
                key={media?.uri}
                style={{
                  flex: 1,
                  height: "100%",
                }}
              >
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={{
                    uri: media?.thumbnail || media?.uri,
                  }}
                />
              </View>
            ))}
          </View>
        )}
      </View>

      <View
        style={{
          gap: 6,
          marginTop: 6,
          flexDirection: "column",
        }}
      >
        <Timeline
          numberOfSteps={5}
          activeStep={uploadStatus?.length}
          sliderColor={
            !!uploadError
              ? "#F83131"
              : uploadStatus?.length !== 5
              ? "#efc475"
              : "#43b65d"
          }
        />

        {!!uploadError ? (
          <View
            style={{
              marginTop: 2,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <RgText
              style={{
                fontSize: 12,
                // color: "#F83131",
              }}
            >
              Error uploading
            </RgText>

            <View
              style={{
                gap: 6,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {[
                {
                  label: "Retry",
                  onPress: () =>
                    currentUpload &&
                    uploadContent(
                      currentUpload?.caption ?? "",
                      currentUpload?.contentType,
                      currentUpload?.price ?? 0,
                      true
                    ),
                },
                {
                  label: "Cancel",
                  onPress: () => cancelUpload(),
                },
              ].map((item) => {
                return (
                  <TouchableOpacity
                    key={item.label}
                    onPress={item.onPress}
                    style={{
                      borderWidth: 1,
                      borderRadius: 60,
                      paddingVertical: 4,
                      paddingHorizontal: item?.label === "Cancel" ? 12 : 16,
                      borderColor:
                        item?.label === "Cancel" ? "#F8313140" : "#bbb",
                      backgroundColor:
                        item?.label === "Cancel" ? "#F8313110" : "#f9f9f9",
                    }}
                  >
                    <RgText
                      style={{
                        fontSize: 12,
                        color: "#000",
                      }}
                    >
                      {item.label}
                    </RgText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ) : (
          <RgText
            style={{
              fontSize: 11,
              color: "#000",
            }}
          >
            {uploadStatus?.[uploadStatus?.length - 1]}
          </RgText>
        )}
      </View>
    </View>
  );
};

export default CurrentUpload;

const styles = StyleSheet.create({
  container: {
    gap: 2,
    marginBottom: 10,
    borderBottomWidth: 1,
    ...padding(18, 16, 16),
  },

  // Post text
  post_textContainer: {
    marginBottom: 10,
  },
  post_text: {
    fontSize: 13,
    lineHeight: 20,
  },
});
