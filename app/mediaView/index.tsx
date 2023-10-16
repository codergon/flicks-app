import { Fragment } from "react";
import { useCallback } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { X } from "lucide-react-native";
import { StatusBar } from "react-native";
import { useFocusEffect } from "expo-router";
import { Container } from "components/_ui/custom";
import { View, TouchableOpacity } from "react-native";
import MediaItemView from "components/shared/mediaItemView";

const ExpandedMediaView = ({}) => {
  const item = useLocalSearchParams();

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
    }, [])
  );

  return (
    <Container
      style={[
        {
          backgroundColor: "#000",
        },
      ]}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          position: "relative",
        }}
      >
        <Fragment>
          <TouchableOpacity
            onPress={() => {
              router.canGoBack()
                ? router.back()
                : router.replace("/(tabs)/(home)/home");
            }}
            style={[
              {
                top: 10,
                left: 10,
                width: 36,
                height: 36,
                zIndex: 99,
                borderRadius: 30,
                alignItems: "center",
                position: "absolute",
                justifyContent: "center",
                backgroundColor: "#14141460",
              },
            ]}
          >
            <X size={22} color="#fff" />
          </TouchableOpacity>
        </Fragment>

        <MediaItemView media={item} />
      </View>
    </Container>
  );
};

export default ExpandedMediaView;
