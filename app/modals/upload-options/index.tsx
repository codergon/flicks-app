import { Fragment } from "react";
import { router } from "expo-router";
import styles from "./upload.styles";
import { CalendarPlus } from "lucide-react-native";
import { TouchableHighlight, View } from "react-native";
import { RgText, Text } from "components/_ui/typography";
import { Broadcast, UploadSimple } from "phosphor-react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <Text style={[{ fontSize: 20 }]}>Create</Text>
      </View>

      <View style={[styles.options]}>
        {[
          {
            title: "Upload contents",
            onpress: () => {
              router.push("/create");
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
  );
}
