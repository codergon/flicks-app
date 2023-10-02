import { Fragment } from "react";
import { Image } from "expo-image";
import { Trash2, X } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

interface UploadMediaPreviewProps {
  data: any[];
  currentIndex?: number;
  removeItem: (id: string) => void;
  scrollToIndex: (index: number) => void;
}
const UploadMediaPreview = ({
  data,
  removeItem,
  scrollToIndex,
  currentIndex = 0,
}: UploadMediaPreviewProps) => {
  return (
    <Fragment>
      <View
        style={[
          {
            gap: 3,
            bottom: 0,
            width: "100%",
            paddingBottom: 30,

            paddingTop: 24,
            // position: "absolute",

            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        {data?.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (index === currentIndex) {
                  removeItem(item.id);
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
                  source={require("assets/images/mock/1.png")}
                  contentFit="contain"
                  transition={300}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </Fragment>
  );
};

export default UploadMediaPreview;
