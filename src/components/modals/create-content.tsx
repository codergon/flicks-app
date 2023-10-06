import { View, StyleSheet, TouchableHighlight } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { padding } from "helpers/styles";
import { useApp } from "contexts/AppContext";
import { CalendarPlus } from "lucide-react-native";
import { useModals } from "contexts/ModalsContext";
import { Fragment, useCallback, useMemo } from "react";
import { RgText, Text } from "components/_ui/typography";
import { Broadcast, UploadSimple } from "phosphor-react-native";
import CustomBackground from "components/modals/custombackground";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CreateContentModal = () => {
  const { startContentUpload } = useApp();
  const { createContentRef, closeCreateContentModal } = useModals();

  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(
    () => [
      190 + // options-height
        16 + // gap between options and header
        24 + // padding top
        insets.bottom + // insets bottom
        10 + // padding bottom
        24, // header height
    ],
    []
  );

  return (
    <BottomSheet
      index={-1}
      ref={createContentRef}
      enablePanDownToClose
      snapPoints={snapPoints}
      handleIndicatorStyle={{
        backgroundColor: "rgba(0,0,0,0.2)",
      }}
      backdropComponent={(props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      backgroundComponent={(props: BottomSheetBackdropProps) => (
        <CustomBackground {...props} />
      )}
    >
      <View style={styles.container}>
        <View style={[styles.header]}>
          <Text style={[{ fontSize: 20 }]}>Create</Text>
        </View>

        <View style={[styles.options]}>
          {[
            {
              title: "Upload contents",
              onpress: () => {
                closeCreateContentModal();
                startContentUpload();
              },
              icon: <UploadSimple size={21} color={"#000"} />,
            },
            {
              title: "Start a live stream",
              onpress: () => {},
              icon: <Broadcast size={21} color={"#000"} />,
            },
            {
              title: "Schedule a live stream",
              onpress: () => {},
              icon: <CalendarPlus size={20} color={"#000"} strokeWidth={1.4} />,
            },
          ].map((i, ind) => {
            return (
              <TouchableHighlight
                key={ind}
                onPress={i.onpress}
                style={[styles.option]}
                underlayColor={"rgba(0,0,0,0.05)"}
              >
                <Fragment>
                  <View
                    style={[
                      styles.option_icon,
                      {
                        backgroundColor: "rgba(0,0,0,0.07)",
                      },
                    ]}
                  >
                    {i.icon}
                  </View>

                  <RgText
                    style={[
                      {
                        fontSize: 16,
                        color: "#000",
                      },
                    ]}
                  >
                    {i.title}
                  </RgText>
                </Fragment>
              </TouchableHighlight>
            );
          })}
        </View>
      </View>
    </BottomSheet>
  );
};

export default CreateContentModal;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    flex: 1,
    alignItems: "center",
    ...padding(24, 0, 36),
    justifyContent: "flex-end",
  },

  // Header
  header: {
    width: "100%",
    ...padding(0, 18),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // Options
  options: {
    width: "100%",
    flexDirection: "column",
  },
  option: {
    gap: 12,
    width: "100%",
    ...padding(10, 16),
    flexDirection: "row",
    alignItems: "center",
  },
  option_icon: {
    width: 46,
    height: 46,
    borderRadius: 46,
    alignItems: "center",
    justifyContent: "center",
  },
});
