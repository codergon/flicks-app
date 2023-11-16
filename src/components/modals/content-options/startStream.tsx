import axios from "axios";
import Layout from "constants/layout";
import { useRef, useState } from "react";
import { padding } from "helpers/styles";
import { ArrowLeft } from "lucide-react-native";
import { useModals } from "providers/ModalsProvider";
import { useAccount } from "providers/AccountProvider";
import { RgText, Text } from "components/_ui/typography";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { CaretDown, ClockCountdown, RssSimple } from "phosphor-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CollapsibleRef } from "react-native-collapsible-tab-view";
import {
  View,
  FlatList,
  Animated,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router } from "expo-router";

interface ContentOptionsProps {
  isSchedule: boolean;
  tabsRef: React.RefObject<CollapsibleRef<string>>;
}

const durations = [
  "15 mins",
  "30 mins",
  "45 mins",
  "1 hour",
  "1.5 hours",
  "2 hours",
] as const;

const durationsInSecs = {
  "15 mins": 900,
  "30 mins": 1800,
  "45 mins": 2700,
  "1 hour": 3600,
  "1.5 hours": 5400,
  "2 hours": 7200,
};

const StartStream = ({ tabsRef, isSchedule }: ContentOptionsProps) => {
  const insets = useSafeAreaInsets();
  const { userSignature } = useAccount();
  const { createContentRef, closeCreateContentModal } = useModals();

  const [title, setTitle] = useState("");
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState<keyof typeof durationsInSecs>(
    durations[0]
  );

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate as Date);
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  // Duration flatlist
  const flatList = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const ITEM_SIZE = 110;
  const ITEM_SPACING = (Layout.window.width - ITEM_SIZE) / 2;

  // Start live stream
  const startLiveStream = async () => {
    if (!title.trim() || !description.trim()) {
      setWarning("Stream title and description are required");
      return;
    }

    setWarning("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "/contents/livestreams",
        {
          title,
          description,
          duration: durationsInSecs[duration],
          ...(isSchedule && {
            // if start date is at least 15 minutes from now use start
            // if not, set start date to 15 minutes from now
            start: (Math.floor((date.getTime() - Date.now()) / 1000) < 900
              ? new Date(Date.now() + 900 * 1000)
              : date
            ).toISOString(),
          }),
        },
        {
          headers: {
            Authorization: `Signature ${userSignature}`,
          },
        }
      );

      // closeCreateContentModal();

      // router.push({
      //   pathname: `/livestream/`,
      //   params: { streamId: item.id, streamDetails: JSON.stringify(item) },
      // });
    } catch (e: any) {
      console.log(e?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View
        style={[
          styles.container,
          {
            paddingTop: 0,
            paddingBottom: insets.bottom + 10,
          },
        ]}
      >
        <View style={[styles.header]}>
          <TouchableOpacity
            style={{
              padding: 8,
            }}
            onPress={() => {
              setTitle("");
              setWarning("");
              setDescription("");
              createContentRef?.current?.snapToIndex(0);
              tabsRef?.current?.jumpToTab("options");
            }}
          >
            <ArrowLeft size={24} color={"#000"} />
          </TouchableOpacity>
          <Text style={[{ fontSize: 20 }]}>
            {isSchedule ? "Schedule live stream" : "Live stream"}
          </Text>
        </View>

        <View style={[styles.body]}>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode as any}
              is24Hour={true}
              onChange={onChange}
            />
          )}

          <View>
            <View style={styles.block}>
              <View style={[styles.inputContainer, { borderColor: "#d8d8d8" }]}>
                <BottomSheetTextInput
                  value={title}
                  keyboardType="default"
                  onChangeText={(text) => setTitle(text)}
                  style={[styles.input, { color: "#000" }]}
                  placeholderTextColor={"#666"}
                  placeholder="Stream title*"
                />
              </View>

              <View style={[styles.inputContainer, { borderColor: "#d8d8d8" }]}>
                <BottomSheetTextInput
                  value={description}
                  keyboardType="default"
                  placeholderTextColor={"#666"}
                  placeholder="Enter a description*"
                  style={[styles.input, { color: "#000" }]}
                  onChangeText={(text) => setDescription(text)}
                />
              </View>
            </View>

            {isSchedule && (
              <View style={[styles.block, { marginTop: 16 }]}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  // onPress={showDatepicker}
                  style={[
                    styles.inputContainer,
                    {
                      alignItems: "center",
                      paddingHorizontal: 14,
                      borderColor: "#d8d8d8",
                      backgroundColor: "#f8f8f8",
                    },
                  ]}
                >
                  <RgText
                    style={{
                      fontSize: 14,
                      color: "#666",
                    }}
                  >
                    Stream starts by
                  </RgText>
                  <View
                    style={{
                      gap: 20,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text>{date.toLocaleString()}</Text>

                    <CaretDown size={16} color={"#000"} weight="bold" />
                  </View>
                </TouchableOpacity>
              </View>
            )}

            <View
              style={{
                gap: 10,
                flexDirection: "column",
                marginTop: isSchedule ? 28 : 40,
              }}
            >
              <View
                style={{
                  gap: 6,
                  width: "100%",
                  paddingHorizontal: 22,
                  flexDirection: "column",
                }}
              >
                <Text style={{ fontSize: 16 }}>Stream duration</Text>
                <RgText
                  style={[
                    {
                      fontSize: 13,
                      color: "#777",
                    },
                  ]}
                >
                  Duration is limited to 2 hours
                </RgText>
              </View>

              <FlatList
                horizontal
                ref={flatList}
                data={durations}
                // disableIntervalMomentum
                scrollEventThrottle={16}
                decelerationRate="fast"
                snapToInterval={ITEM_SIZE}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: ITEM_SPACING,
                }}
                onMomentumScrollEnd={(event) => {
                  const index = Math.floor(
                    event.nativeEvent.contentOffset.x / ITEM_SIZE
                  );
                  setDuration(durations[index]);
                }}
                onScrollToIndexFailed={(info) => {
                  const wait = new Promise((resolve) =>
                    setTimeout(resolve, 500)
                  );
                  wait.then(() => {
                    flatList.current?.scrollToIndex({
                      index: info.index,
                      animated: true,
                    });
                  });
                }}
                keyExtractor={(item, index) => item + index.toString()}
                onScroll={(event) => {
                  Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                  )(event);
                }}
                renderItem={({ item, index }) => {
                  const inputRange = [
                    (index - 1) * ITEM_SIZE,
                    index * ITEM_SIZE,
                    (index + 1) * ITEM_SIZE,
                  ];

                  const opacity = scrollX.interpolate({
                    inputRange,
                    extrapolate: "clamp",
                    outputRange: [0.5, 1, 0.5],
                  });

                  const scale = scrollX.interpolate({
                    inputRange,
                    extrapolate: "clamp",
                    outputRange: [0.7, 1, 0.7],
                  });

                  return (
                    <Animated.View
                      style={[
                        {
                          width: ITEM_SIZE,
                          overflow: "hidden",
                          paddingVertical: 8,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                      ]}
                    >
                      <Animated.Text
                        numberOfLines={1}
                        style={[
                          {
                            opacity,
                            fontSize: 22,
                            transform: [{ scale }],
                            fontFamily: "AcidGrotesk-Medium",
                          },
                        ]}
                      >
                        {item}
                      </Animated.Text>
                    </Animated.View>
                  );
                }}
              />
            </View>
          </View>

          <View
            style={{
              gap: 9,
              width: "100%",
              paddingHorizontal: 18,
            }}
          >
            {warning && (
              <Text
                style={{
                  fontSize: 12,
                  color: "#ed693d",
                  textAlign: "center",
                }}
              >
                {warning}
              </Text>
            )}

            <TouchableOpacity
              disabled={loading}
              activeOpacity={0.7}
              onPress={startLiveStream}
              style={[
                styles.submitBtn,
                {
                  opacity: 1,
                  backgroundColor: "#111",
                },
              ]}
            >
              <RgText
                style={{
                  fontSize: 16,
                  color: "#fff",
                }}
              >
                {isSchedule ? "Schedule" : "Go live"}
              </RgText>
              {isSchedule ? (
                <ClockCountdown size={17} color={"#fff"} weight="regular" />
              ) : (
                <RssSimple size={17} color={"#fff"} weight="regular" />
              )}

              {loading && (
                <ActivityIndicator
                  size={"small"}
                  style={{
                    right: 16,
                    position: "absolute",
                  }}
                  color={"#fff"}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default StartStream;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    flex: 1,
    alignItems: "center",
  },

  // Header
  header: {
    gap: 12,
    width: "100%",
    ...padding(0, 14),
    flexDirection: "row",
    alignItems: "center",
  },

  // Body
  body: {
    gap: 12,
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  block: {
    gap: 12,
    paddingHorizontal: 16,
    flexDirection: "column",
  },

  inputContainer: {
    gap: 24,
    height: 46,
    borderWidth: 1,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#000",
    height: "100%",
    paddingHorizontal: 14,
    fontFamily: "DMSans-Regular",
  },

  // Submit Button
  submitBtn: {
    gap: 7,
    height: 46,
    width: "100%",
    borderRadius: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});
