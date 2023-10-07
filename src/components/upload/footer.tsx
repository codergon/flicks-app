import { Fragment } from "react";
import { padding } from "helpers/styles";
import Icons from "components/_common/Icons";
import { MediaType, useApp } from "contexts/AppContext";
import RotationDividers from "./rotationDividers";
import { RgText } from "components/_ui/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Perspective,
  ArrowUUpLeft,
  SpeakerSimpleSlash,
} from "phosphor-react-native";

const videoActions = [
  {
    action: "mute",
    icon: <SpeakerSimpleSlash size={20} color="#fff" />,
  },
];
const imageActions = [
  {
    action: "rotate",
    icon: <Icons.Rotate size={20} color="#fff" />,
  },
  {
    action: "horizontalFlip",
    icon: (
      <Perspective
        size={20}
        color="#fff"
        style={{
          transform: [{ rotate: "90deg" }],
        }}
      />
    ),
  },
  {
    action: "verticalFlip",
    icon: <Perspective size={20} color="#fff" />,
  },
  {
    action: "undo",
    icon: <ArrowUUpLeft size={20} color="#fff" />,
  },
];

interface UploadFooterProps {
  currentMedia: MediaType;
}

const UploadFooter = ({ currentMedia }: UploadFooterProps) => {
  const insets = useSafeAreaInsets();
  const { editMedia } = useApp();

  return (
    <Fragment>
      <View
        style={[
          styles.footer,
          {
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: "#333",
            backgroundColor: "transparent",
            paddingBottom: insets.bottom + 6,
          },
        ]}
      >
        <RotationDividers />

        <View style={[styles.footer_row]}>
          <View style={[styles.actionBtns]}>
            {(currentMedia?.type === "video" ? videoActions : imageActions).map(
              (item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.actionBtn,
                      {
                        backgroundColor: "#1a1a1a",
                      },
                    ]}
                    onPress={() =>
                      editMedia(item.action, currentMedia?.assetId ?? "")
                    }
                  >
                    {item.icon}
                    <RgText
                      style={{
                        fontSize: 12,
                        color: "#fff",
                        display: "none",
                        textTransform: "capitalize",
                      }}
                    >
                      {item.action}
                    </RgText>
                  </TouchableOpacity>
                );
              }
            )}
          </View>

          <View
            style={[
              styles.actionBtn,
              {
                height: 43,
                borderWidth: 0.6,
                borderColor: "#555",
                backgroundColor: "#121212",
                width: currentMedia?.type === "video" ? "auto" : 43,
                paddingHorizontal: currentMedia?.type === "video" ? 16 : 0,
              },
            ]}
          >
            <RgText
              style={{
                fontSize: 12,
                color: "#fff",
                letterSpacing: 0.5,
              }}
            >
              {currentMedia?.type === "video" ? (
                <>
                  {currentMedia?.duration && (
                    <>
                      {Math.floor(currentMedia?.duration / 1000 / 60) > 9
                        ? Math.floor(currentMedia?.duration / 1000 / 60)
                        : `0${Math.floor(currentMedia?.duration / 1000 / 60)}`}
                      :
                      {Math.floor(currentMedia?.duration / 1000) > 9
                        ? Math.floor(currentMedia?.duration / 1000)
                        : `0${Math.floor(currentMedia?.duration / 1000)}`}
                    </>
                  )}
                </>
              ) : (
                <>
                  {((currentMedia?.edits?.filter((e) => e === "rotate") || [])
                    ?.length *
                    -90) %
                    360}
                </>
              )}
            </RgText>
          </View>
        </View>
      </View>
    </Fragment>
  );
};

export default UploadFooter;

const styles = StyleSheet.create({
  footer: {
    gap: 22,
    width: "100%",
    paddingTop: 16,
    flexDirection: "column",
  },
  footer_row: {
    width: "100%",
    ...padding(0, 18),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionBtns: {
    gap: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  actionBtn: {
    gap: 12,
    width: 44,
    height: 44,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
