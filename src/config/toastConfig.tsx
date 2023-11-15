import {
  BaseToast,
  ErrorToast,
  BaseToastProps,
} from "react-native-toast-message";
import Layout from "constants/layout";
import useColorScheme from "hooks/useColorScheme";

const toastConfig = {
  success: (props: BaseToastProps) => {
    const colorScheme = useColorScheme();
    const toastText = colorScheme === "dark" ? "#fff" : "#000";
    const toastText2 = colorScheme === "dark" ? "#999" : "#777";
    const toastBorder = colorScheme === "dark" ? "#333" : "#ccc";
    const toastBackground = colorScheme === "dark" ? "#1b1b1b" : "#fff";

    return (
      <BaseToast
        {...props}
        style={{
          height: "auto",
          borderWidth: 1,
          paddingLeft: 0,
          borderRadius: 10,
          paddingVertical: 0,
          borderColor: toastBorder,
          borderLeftColor: "#419B45",
          width: Layout.window.width - 32,
          backgroundColor: toastBackground,
        }}
        renderLeadingIcon={() => null}
        contentContainerStyle={{
          gap: 2,
          minHeight: 50,
          paddingVertical: 10,
          paddingHorizontal: 14,
        }}
        text1Style={{
          fontSize: 14,
          color: toastText,
          fontFamily: "AcidGrotesk-Medium",
        }}
        text2Props={{
          numberOfLines: 2,
        }}
        text2Style={{
          fontSize: 12,
          lineHeight: 18,
          color: toastText2,
          fontFamily: "DMSans-Medium",
        }}
      />
    );
  },

  warning: (props: BaseToastProps) => {
    const colorScheme = useColorScheme();
    const toastText = colorScheme === "dark" ? "#fff" : "#000";
    const toastText2 = colorScheme === "dark" ? "#999" : "#777";
    const toastBorder = colorScheme === "dark" ? "#333" : "#ccc";
    const toastBackground = colorScheme === "dark" ? "#1b1b1b" : "#fff";

    return (
      <BaseToast
        {...props}
        style={{
          height: "auto",
          borderWidth: 1,
          paddingLeft: 0,
          borderRadius: 10,
          paddingVertical: 0,
          borderColor: toastBorder,
          borderLeftColor: "#efc475",
          width: Layout.window.width - 32,
          backgroundColor: toastBackground,
        }}
        renderLeadingIcon={() => null}
        contentContainerStyle={{
          gap: 2,
          minHeight: 50,
          paddingVertical: 10,
          paddingHorizontal: 14,
        }}
        text1Style={{
          fontSize: 14,
          color: toastText,
          fontFamily: "AcidGrotesk-Medium",
        }}
        text2Props={{
          numberOfLines: 2,
        }}
        text2Style={{
          fontSize: 12,
          lineHeight: 18,
          color: toastText2,
          fontFamily: "DMSans-Medium",
        }}
      />
    );
  },

  error: (props: BaseToastProps) => {
    const colorScheme = useColorScheme();
    const toastText = colorScheme === "dark" ? "#fff" : "#000";
    const toastText2 = colorScheme === "dark" ? "#999" : "#777";
    const toastBorder = colorScheme === "dark" ? "#333" : "#ccc";
    const toastBackground = colorScheme === "dark" ? "#1b1b1b" : "#fff";

    return (
      <ErrorToast
        {...props}
        style={{
          height: "auto",
          borderWidth: 1,
          paddingLeft: 0,
          borderRadius: 10,
          paddingVertical: 0,
          borderColor: toastBorder,
          borderLeftColor: "#F83131",
          width: Layout.window.width - 32,
          backgroundColor: toastBackground,
        }}
        renderLeadingIcon={() => null}
        contentContainerStyle={{
          gap: 2,
          minHeight: 50,
          paddingVertical: 10,
          paddingHorizontal: 14,
        }}
        text1Style={{
          fontSize: 14,
          color: toastText,
          fontFamily: "AcidGrotesk-Medium",
        }}
        text2Props={{
          numberOfLines: 2,
        }}
        text2Style={{
          fontSize: 12,
          lineHeight: 18,
          color: toastText2,
          fontFamily: "DMSans-Medium",
        }}
      />
    );
  },
};

export default toastConfig;
