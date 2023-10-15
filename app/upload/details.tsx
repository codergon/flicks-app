import { Image } from "expo-image";
import { ActivityIndicator, StatusBar } from "react-native";
import { styles } from "./details.styles";
import { useApp } from "providers/AppProvider";
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

  const { selectedMedia, uploading, uploadContent } = useApp();

  const [price, setPrice] = useState("");
  const [caption, setCaption] = useState("");
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
          {/* <View style={[styles.postSettings__item]}>
            <View style={[styles.postSettings__item_details]}>
              <Text
                style={[
                  {
                    fontSize: 16,
                    color: "#fff",
                  },
                ]}
              >
                Enter a caption
              </Text>
            </View>
          </View> */}

          <InputRg
            value={caption}
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
            onChangeText={(text) => setCaption(text)}
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
        disabled={
          !caption ||
          uploading ||
          (isPaid && (!price || isNaN(Number(price)) || Number(price) < 1))
        }
        onPress={() =>
          uploadContent(
            caption,
            isPaid ? "paid" : "free",
            isPaid ? Number(price) : 0
          )
        }
        style={[
          styles.submitBtn,
          {
            opacity:
              !caption ||
              (isPaid && (!price || isNaN(Number(price)) || Number(price) < 1))
                ? 0.8
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
          {uploading ? "Uploading Post" : "Upload Post"}
        </Text>

        {uploading && (
          <ActivityIndicator
            size={"small"}
            style={{
              right: 16,
              position: "absolute",
            }}
            color={"#000"}
          />
        )}
      </TouchableOpacity>
    </Container>
  );
};

export default UploadDetails;
