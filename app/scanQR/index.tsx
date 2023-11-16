import { router } from "expo-router";
import Layout from "constants/layout";
import { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { CameraOff, Scan, X } from "lucide-react-native";
import { RgText, Text } from "components/_ui/typography";
// import validateAlgorandAddress from "utils/validateAddress";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAccount } from "providers/AccountProvider";

const ScanQR = () => {
  const { userData } = useAccount();
  const insets = useSafeAreaInsets();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    if (data?.length < 44) return;

    // if (validateAlgorandAddress(data)) {
    //   if (userData?.address === data) {
    //     router.push(`/(tabs)/(account)/account`);
    //   } else {
    //     router.push(`/(tabs)/(home)/${data as any}`);
    //   }
    // }
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          style={styles.camera}
          onBarCodeScanned={handleBarCodeScanned}
        />

        <View style={styles.cameraLabels}>
          <Scan
            size={Layout.window.width * 0.7}
            color="#fff"
            strokeWidth={0.3}
          />
          <RgText
            style={{
              fontSize: 16,
              color: "#fff",
              maxWidth: "90%",
              textAlign: "center",
            }}
          >
            Scan a user's QR code to view their profile
          </RgText>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: "flex-end",
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: "#fff",
            maxHeight: Layout.window.height - insets.top,
          },
        ]}
      >
        <View
          style={[
            styles.header,
            {
              overflow: "hidden",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              backgroundColor: "#e8e8e8",
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.cancelBtn]}
            onPress={() => router.back()}
          >
            <X size={22} color={"#000"} strokeWidth={2.1} />
          </TouchableOpacity>
          <Text style={[styles.headerText]}>Share your profile</Text>
        </View>

        {hasPermission === null ? (
          <></>
        ) : hasPermission === false ? (
          <View
            style={[
              styles.flexView,
              {
                paddingBottom: 70,
                backgroundColor: "transparent",
              },
            ]}
          >
            <View
              style={[
                styles.flexView,
                { gap: 12, alignItems: "center", justifyContent: "center" },
              ]}
            >
              <CameraOff size={32} color="#444" strokeWidth={1.6} />
              <RgText style={{ fontSize: 16, color: "#000" }}>
                Camera permission not granted
              </RgText>
            </View>
          </View>
        ) : (
          <>{renderCamera()}</>
        )}
      </View>
    </View>
  );
};

export default ScanQR;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    flexDirection: "column",
    backgroundColor: "transparent",
  },

  header: {
    height: 48,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 16,
    letterSpacing: 0.3,
  },
  cancelBtn: {
    top: 0,
    left: 10,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },

  flexView: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    flex: 1,
    overflow: "hidden",
    position: "relative",
  },
  camera: {
    flex: 1,
  },
  cameraLabels: {
    gap: 20,
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
});
