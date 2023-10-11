import { Fragment } from "react";
import { Image } from "expo-image";
import { Trash2, X } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { useApp } from "providers/AppProvider";

interface UploadMediaPreviewProps {
  currentIndex?: number;
  scrollToIndex: (index: number) => void;
}
const UploadMediaPreview = ({
  scrollToIndex,
  currentIndex = 0,
}: UploadMediaPreviewProps) => {
  const { selectedMedia, removeMedia } = useApp();

  return (
    <Fragment>
      {selectedMedia.length > 1 && (
        <View
          style={[
            {
              gap: 3,
              bottom: 0,
              width: "100%",
              paddingBottom: 30,

              // paddingTop: 24,
              position: "absolute",

              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          {selectedMedia?.map((item, index) => {
            return (
              <TouchableOpacity
                key={item.assetId}
                onPress={() => {
                  if (index === currentIndex) {
                    removeMedia(item.assetId ?? "");
                  } else {
                    scrollToIndex(index);
                  }
                }}
                style={[
                  {
                    width: 56,
                    height: 56,
                    borderRadius: 5,
                    overflow: "hidden",
                    borderColor: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: index === currentIndex ? 2.2 : 0,
                  },
                ]}
              >
                <View
                  style={[
                    {
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                      position: "relative",
                      borderRadius: 5 - 2.2,
                    },
                  ]}
                >
                  {index === currentIndex && (
                    <View
                      style={{
                        top: 0,
                        left: 0,
                        zIndex: 99,
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                        position: "absolute",
                        justifyContent: "center",
                        backgroundColor: "#14141460",
                      }}
                    >
                      <Trash2 size={26} color="#fff" strokeWidth={1.6} />
                    </View>
                  )}

                  <Image
                    style={[
                      {
                        width: "100%",
                        height: "100%",
                      },
                    ]}
                    source={{ uri: item?.thumbnail || item?.uri }}
                    contentFit="cover"
                    transition={300}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </Fragment>
  );
};

export default UploadMediaPreview;
