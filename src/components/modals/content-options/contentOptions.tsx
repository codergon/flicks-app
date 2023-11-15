import { Fragment } from "react";
import { padding } from "helpers/styles";
import { useApp } from "providers/AppProvider";
import { CalendarPlus } from "lucide-react-native";
import { useModals } from "providers/ModalsProvider";
import { RgText, Text } from "components/_ui/typography";
import { Broadcast, UploadSimple } from "phosphor-react-native";
import { CollapsibleRef } from "react-native-collapsible-tab-view";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ContentOptionsProps {
  tabsRef: React.RefObject<CollapsibleRef<string>>;
  setIsSchedule: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContentOptions = ({ tabsRef, setIsSchedule }: ContentOptionsProps) => {
  const insets = useSafeAreaInsets();
  const { startContentUpload } = useApp();
  const { createContentRef, closeCreateContentModal } = useModals();

  return (
    <>
      <View
        style={[
          styles.container,
          {
            paddingTop: 6,
            // backgroundColor: "red",
            paddingBottom: insets.bottom + 10,
          },
        ]}
      >
        <View style={[styles.header]}>
          <Text style={[{ fontSize: 20 }]}>Create</Text>
        </View>

        <View style={[styles.options]}>
          {[
            {
              title: "Upload content",
              onpress: () => {
                closeCreateContentModal();
                startContentUpload();
              },
              icon: <UploadSimple size={21} color={"#000"} />,
            },
            {
              title: "Start a live stream",
              onpress: () => {
                setIsSchedule(false);
                createContentRef?.current?.snapToIndex(1);
                tabsRef?.current?.jumpToTab("start-stream");
              },
              icon: <Broadcast size={21} color={"#000"} />,
            },
            {
              title: "Schedule a live stream",
              onpress: () => {
                setIsSchedule(true);
                createContentRef?.current?.snapToIndex(1);
                tabsRef?.current?.jumpToTab("start-stream");
              },
              icon: <CalendarPlus size={20} color={"#000"} strokeWidth={1.4} />,
            },
          ].map((i, ind) => {
            return (
              <TouchableHighlight
                key={ind}
                onPress={i.onpress}
                style={[styles.option]}
                underlayColor={"rgba(0,0,0,0.04)"}
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
    </>
  );
};

export default ContentOptions;

const styles = StyleSheet.create({
  container: {
    gap: 6,
    flex: 1,
    alignItems: "center",
    // justifyContent: "flex-end",
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
