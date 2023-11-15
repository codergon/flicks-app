import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { primaryColor } from "constants/colors";
import { InputRg } from "components/_ui/typography";
import { Gift, ShareFat } from "phosphor-react-native";
import { TouchableOpacity, View } from "components/_ui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

interface LiveStreamFooterProps {
  isHost: boolean;
  sendChannelMessage: (message: string) => Promise<void>;
}

const LiveStreamFooter = ({
  isHost,
  sendChannelMessage,
}: LiveStreamFooterProps) => {
  const insets = useSafeAreaInsets();
  const [comment, setComment] = useState("");
  const [isfocused, setIsfocused] = useState(false);

  return (
    <>
      <KeyboardAvoidingView
        behavior="position"
        style={[
          styles.footer,
          {
            height: 46 + 16 + 16,
            backgroundColor: "#000",
          },
        ]}
      >
        <View
          style={{
            height: 200,
            bottom: -200,
            width: "100%",
            position: "absolute",
            backgroundColor: "#000",
          }}
        />

        <View
          style={{
            width: "100%",
            paddingVertical: 16,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            backgroundColor: "#000",
          }}
        >
          <View
            style={{
              gap: 14,
              height: 46,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
          >
            <View
              style={[
                styles.commentInputContainer,
                {
                  borderWidth: 1,
                  borderColor: "#424242",
                },
              ]}
            >
              <InputRg
                value={comment}
                returnKeyType="send"
                keyboardType="default"
                keyboardAppearance="dark"
                placeholder="Add a comment"
                style={[styles.commentInput]}
                placeholderTextColor={"#999"}
                onFocus={() => setIsfocused(true)}
                onBlur={() => setIsfocused(false)}
                onChangeText={(text) => setComment(text)}
                onSubmitEditing={(e) => {
                  sendChannelMessage(e.nativeEvent.text);
                  setComment("");
                }}
              />
            </View>

            {!isfocused && (
              <View style={[styles.actionbtnContainer]}>
                {!isHost && (
                  <TouchableOpacity
                    style={[
                      styles.actionbtn,
                      { backgroundColor: primaryColor },
                    ]}
                  >
                    <Gift size={20} color="#fff" weight="fill" />
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[
                    styles.actionbtn,
                    { borderWidth: 1, borderColor: "#555" },
                  ]}
                >
                  <ShareFat size={20} color="#ccc" weight="fill" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>

      <View
        style={{
          backgroundColor: "#000",
          height: insets.bottom - 6,
        }}
      />
    </>
  );
};

export default LiveStreamFooter;

const styles = StyleSheet.create({
  footer: {
    gap: 14,
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  commentInputContainer: {
    flex: 1,
    height: 46,
    borderRadius: 32,
    overflow: "hidden",
    alignItems: "center",
    flexDirection: "row",
  },
  commentInput: {
    fontSize: 14,
    width: "100%",
    height: "100%",
    color: "#fff",
    paddingHorizontal: 14,
  },

  actionbtnContainer: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  actionbtn: {
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
