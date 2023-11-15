import axios from "axios";
import { X } from "phosphor-react-native";
import { Fragment, useState } from "react";
import Toast from "react-native-toast-message";
import { styles } from "./withdrawModal.styles";
import { useModals } from "providers/ModalsProvider";
import { useAccount } from "providers/AccountProvider";
import { RgText, Text } from "components/_ui/typography";
import { TouchableOpacity } from "components/_ui/themed";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { ActivityIndicator, Keyboard, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface WithdrawalPopUpProps {
  price: string;
  setPrice: (price: string) => void;
}

const WithdrawalPopUp = ({ price, setPrice }: WithdrawalPopUpProps) => {
  const insets = useSafeAreaInsets();
  const { closeWithdrawalModal } = useModals();
  const { userSignature, fetchUserData } = useAccount();
  const [withdrawing, setWithdrawing] = useState(false);

  const handleWithdrawal = async () => {
    setWithdrawing(true);

    try {
      const { data } = await axios.post(
        "/creators/withdrawals",
        {
          amount: price,
        },
        {
          headers: {
            Authorization: `Signature ${userSignature?.publicKey}:${userSignature?.signature}`,
          },
        }
      );

      await fetchUserData(true);
      setPrice("");
      closeWithdrawalModal();
    } catch (error: any) {
      console.log(error?.response?.data?.errors, error);

      Toast.show({
        type: "error",
        text1: "Withdrawal failed",
        text2: "An error occured while processing your withdrawal",
        topOffset: insets.top + 10,
      });
    } finally {
      setWithdrawing(false);
    }
  };

  const NoteText = ({ note = "" }) => (
    <View
      style={{
        marginTop: 6,
        width: "100%",
        paddingHorizontal: 6,
        flexDirection: "column",
      }}
    >
      <RgText
        style={[
          {
            fontSize: 12,
            color: "#777",
          },
        ]}
      >
        {note}
      </RgText>
    </View>
  );

  return (
    <>
      <View
        onTouchStart={() => Keyboard.dismiss()}
        style={[
          styles.container,
          {
            minHeight: 300,
          },
        ]}
      >
        <View
          style={[
            styles.header,
            {
              marginBottom: 8,
              borderBottomWidth: 1,
              borderColor: "#e1e1e1",
            },
          ]}
        >
          <Text style={[{ fontSize: 18 }]}>Withdraw</Text>

          <TouchableOpacity
            onPress={closeWithdrawalModal}
            style={[
              {
                padding: 6,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <X size={18} weight="bold" color={"#000"} />
          </TouchableOpacity>
        </View>

        <View style={[styles.configs]}>
          <Fragment>
            <View
              style={[
                styles.input_cover,
                {
                  height: 46,
                  borderWidth: 1,
                  borderRadius: 14,
                  borderColor: "#d8d8d8",
                  // backgroundColor: "#f8f8f8",
                },
              ]}
            >
              <BottomSheetTextInput
                value={price}
                keyboardType="numeric"
                onChangeText={(text) => setPrice(text)}
                style={[
                  styles.priceInput,
                  {
                    fontSize: 14,
                    color: "#000",
                    fontFamily: "DMSans-Regular",
                  },
                ]}
                placeholderTextColor={"#666"}
                placeholder="Amount in USDC... (minimum of 5 USDC)"
              />
            </View>

            <NoteText note="Note: 10% fee is  charged on every withdrawal" />
          </Fragment>
        </View>

        <View
          style={{
            width: "100%",
            paddingHorizontal: 16,
          }}
        >
          <TouchableOpacity
            disabled={
              withdrawing || !price || Number(price) < 5 || isNaN(Number(price))
            }
            onPress={handleWithdrawal}
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
                fontSize: 15,
                color: "#fff",
              }}
            >
              Withdraw
            </RgText>

            {withdrawing && (
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
    </>
  );
};

export default WithdrawalPopUp;
