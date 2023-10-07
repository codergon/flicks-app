import { Image } from "expo-image";
import { StatusBar } from "react-native";
import { styles } from "./details.styles";
import { useApp } from "contexts/AppContext";
import { Container } from "components/_ui/custom";
import React, { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { ArrowLeft, Stack } from "phosphor-react-native";
import { Switch, TouchableOpacity, View } from "react-native";
import { InputRg, RgText, Text } from "components/_ui/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const UploadDetails = () => {
  const insets = useSafeAreaInsets();
  useFocusEffect(
    useCallback(() => {
      // Change status bar color
      StatusBar.setBarStyle("light-content");
    }, [])
  );

  const { selectedMedia } = useApp();

  const [price, setPrice] = useState("");
  const [isPaid, setIsPaid] = useState(true);

  return (
    <Container
      style={[
        {
          paddingTop: insets.top,
          backgroundColor: "#0e0e0e",
          paddingBottom: insets.bottom + 16,
        },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            borderBottomWidth: 1,
            borderColor: "#333",
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            router.canGoBack()
              ? router.back()
              : router.replace("/(tabs)/(home)/home");
          }}
          style={styles.backBtn}
        >
          <ArrowLeft weight="bold" size={18} color="#fff" />
        </TouchableOpacity>

        <Text
          style={[
            styles.header__title,
            {
              color: "#fff",
            },
          ]}
        >
          Post details
        </Text>
        <View style={[{ width: 18 }]} />
      </View>

      <KeyboardAwareScrollView contentContainerStyle={[styles.body]}>
        <View
          style={[
            styles.mediaPreview,
            {
              borderWidth: 1,
              borderColor: "#444",
            },
          ]}
        >
          <Image
            source={{
              uri:
                selectedMedia?.find((m) => m.type === "image")?.uri ||
                selectedMedia?.[0]?.thumbnail,
            }}
            style={styles.mediaThumbnail}
          />

          <View
            style={[
              styles.previewOverlay,
              {
                alignItems: "flex-end",
                justifyContent: "flex-end",
                backgroundColor: "rgba(0,0,0,0.1)",
              },
            ]}
          >
            <View
              style={[
                styles.previewOverlay_info,
                {
                  backgroundColor: "rgba(0,0,0,0.46)",
                },
              ]}
            >
              <Stack size={14} weight="fill" color="#fff" />
              <Text
                style={{
                  fontSize: 13,
                  color: "#fff",
                }}
              >
                {selectedMedia?.length}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.postCaption]}>
          <InputRg
            numberOfLines={5}
            multiline
            keyboardType="twitter"
            style={[
              styles.captionInput,
              {
                fontSize: 16,
                color: "#fff",
                borderRadius: 10,
                backgroundColor: "#222",
              },
            ]}
            placeholderTextColor={"#999"}
            placeholder="Add a caption..."
          />
        </View>

        <View style={[styles.postSettings]}>
          <View
            style={[
              styles.postSettings__item,
              {
                borderColor: "#333",
                // borderBottomWidth: 1,
              },
            ]}
          >
            <View style={[styles.postSettings__item_details]}>
              <Text
                style={[
                  {
                    fontSize: 16,
                    color: "#fff",
                  },
                ]}
              >
                Paid content
              </Text>
              <RgText
                style={[
                  {
                    color: "#888",
                  },
                ]}
              >
                Choose between free & paid content
              </RgText>
            </View>

            <Switch
              value={isPaid}
              ios_backgroundColor="#3e3e3e"
              thumbColor={isPaid ? "#fff" : "#fff"}
              onValueChange={() => setIsPaid((p) => !p)}
              trackColor={{ false: "#3e3e3e", true: "#a38cff" }}
            />
          </View>

          {isPaid && (
            <View
              style={[
                styles.postSettings__item,
                {
                  height: 52,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "#444",
                },
              ]}
            >
              <InputRg
                value={price}
                onChangeText={(text) => setPrice(text)}
                keyboardType="numeric"
                style={[
                  styles.priceInput,
                  {
                    fontSize: 16,
                    color: "#fff",
                  },
                ]}
                placeholderTextColor={"#999"}
                placeholder="Amount in USD... (> 1 USD)"
              />
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>

      <TouchableOpacity
        style={[
          styles.submitBtn,
          {
            opacity:
              isPaid && (!price || isNaN(Number(price)) || Number(price) < 1)
                ? 0.7
                : 1,
            backgroundColor: "#fff",
          },
        ]}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#000",
          }}
        >
          Upload Post
        </Text>
      </TouchableOpacity>
    </Container>
  );
};

export default UploadDetails;
