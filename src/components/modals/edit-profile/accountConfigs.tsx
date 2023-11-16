import axios from "axios";
import NFTItem from "./NFTItem";
import Layout from "constants/layout";
import { X } from "phosphor-react-native";
import { Fragment, useState } from "react";
import { styles } from "./editProfile.styles";
import { useModals } from "providers/ModalsProvider";
import { useAccount } from "providers/AccountProvider";
import nftCollections from "constants/nftCollections";
import { Check, ChevronDown } from "lucide-react-native";
import { RgText, Text } from "components/_ui/typography";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { ActivityIndicator, Keyboard, View } from "react-native";
import { ScrollView, TouchableOpacity } from "components/_ui/themed";
import {
  Menu,
  renderers,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";

const ASAs = [
  {
    token_decimals: 8,
    token_id: "12400859",
    token_name: "EURe",
  },
  {
    token_decimals: 5,
    token_id: "105371557",
    token_name: "MONT",
  },
  {
    token_decimals: 6,
    token_id: "14704676",
    token_name: "wALGOTs",
  },
];

const AccountConfigs = () => {
  const { closeUpdateAccountModal } = useModals();
  const { userData, userSignature, fetchUserData } = useAccount();

  const [price, setPrice] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [updating, setUpdating] = useState(false);

  const [selectedNft, setSelectedNft] = useState<any>(ASAs[0]);
  const [acctType, setAcctType] = useState<"monetary" | "free" | "token gated">(
    "free"
  );

  const handleUpdateAccount = async () => {
    if (acctType === "token gated" && Number(tokenBalance) < 1) return;
    if (acctType === "free" && userData?.subscription_type === "free") {
      closeUpdateAccountModal();
      return;
    }

    setUpdating(true);

    try {
      const reqData = {
        type: acctType,
        status: "active",
        ...(acctType === "monetary" && { amount: price }),
        ...(acctType === "token gated" && {
          token_id: selectedNft?.token_id,
          token_name: selectedNft?.token_name,
          token_decimals: selectedNft?.token_decimals,
          minimum_token_balance: tokenBalance,
        }),
      };

      const { data } = await axios.put("/subscriptions/", reqData, {
        headers: {
          Authorization: `Signature ${userSignature}`,
        },
      });

      await fetchUserData(true);
      closeUpdateAccountModal();
      setAcctType("free");
    } catch (error: any) {
      console.log(error?.response?.data?.errors, error);
    } finally {
      setUpdating(false);
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
          <Text style={[{ fontSize: 18 }]}>Update your account</Text>

          <TouchableOpacity
            onPress={closeUpdateAccountModal}
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
          <View
            style={[
              styles.row,
              {
                justifyContent: "flex-start",
              },
            ]}
          >
            {[
              {
                label: "Free account",
                value: "free",
              },
              {
                label: "Paid account",
                value: "monetary",
              },
              {
                label: "ASA Gating",
                value: "token gated",
              },
            ].map((type, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setAcctType(type.value as any)}
                  style={[
                    styles.selectBtn,
                    {
                      borderStyle: acctType === type.value ? "dashed" : "solid",
                      borderColor: acctType === type.value ? "#222" : "#ccc",
                    },
                  ]}
                >
                  {acctType === type.value && (
                    <Check size={14} color={"#000"} strokeWidth={2.5} />
                  )}

                  {acctType === type.value ? (
                    <Text
                      style={[
                        styles.selectbtn_text,
                        {
                          fontSize: 11.5,
                          color: "#000",
                        },
                      ]}
                    >
                      {type.label}
                    </Text>
                  ) : (
                    <RgText
                      style={[
                        styles.selectbtn_text,
                        {
                          color: "#777",
                        },
                      ]}
                    >
                      {type.label}
                    </RgText>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {acctType === "monetary" ? (
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
                  placeholder="Amount in USD... (> 1 USD)"
                />
              </View>

              <NoteText note="Note: 10% fee will be charged on every withdrawal" />
            </Fragment>
          ) : acctType === "token gated" ? (
            <Fragment>
              <Menu
                style={{
                  width: "100%",
                  position: "relative",
                }}
                renderer={renderers.Popover}
              >
                <MenuTrigger
                  customStyles={{
                    triggerTouchable: {
                      activeOpacity: 0.6,
                      underlayColor: "transparent",
                    },
                  }}
                >
                  <View
                    style={[
                      styles.selectedNft,
                      {
                        borderColor: "#bbb",
                      },
                    ]}
                  >
                    <NFTItem data={selectedNft} />

                    <ChevronDown size={17} color="#000" strokeWidth={2.6} />
                  </View>
                </MenuTrigger>

                <MenuOptions
                  optionsContainerStyle={{
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    elevation: 0,
                    borderWidth: 1,
                    maxHeight: 270,
                    borderRadius: 14,
                    borderColor: "#ccc",
                    backgroundColor: "#fff",
                    shadowColor: "transparent",
                    width: Layout.window.width - 32,
                  }}
                  customStyles={{
                    optionsWrapper: {
                      borderRadius: 14,
                      overflow: "hidden",
                    },
                  }}
                >
                  <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {[
                      {
                        token_decimals: 8,
                        token_id: "12400859",
                        token_name: "EURe",
                      },
                      {
                        token_decimals: 5,
                        token_id: "105371557",
                        token_name: "MONT",
                      },
                      {
                        token_decimals: 6,
                        token_id: "14704676",
                        token_name: "wALGOTs",
                      },
                    ].map((nft, index) => {
                      return (
                        <MenuOption
                          key={index}
                          onSelect={() => setSelectedNft(nft)}
                          customStyles={{
                            optionWrapper: {
                              borderColor: "#e4e4e4",
                              paddingVertical: 12,
                              paddingHorizontal: 16,
                              borderBottomWidth:
                                index === ASAs.length - 1 ? 0 : 1,
                            },
                          }}
                        >
                          <NFTItem data={nft} />
                        </MenuOption>
                      );
                    })}
                  </ScrollView>
                </MenuOptions>
              </Menu>

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
                  value={tokenBalance}
                  keyboardType="numeric"
                  onChangeText={(text) => setTokenBalance(text)}
                  style={[
                    styles.priceInput,
                    {
                      fontSize: 14,
                      color: "#000",
                      fontFamily: "DMSans-Regular",
                    },
                  ]}
                  placeholderTextColor={"#666"}
                  placeholder="Minimum amount of token balance required"
                />
              </View>

              <NoteText note="Only subscribers with this NFT will be able to access your content" />
            </Fragment>
          ) : (
            <Fragment>
              <NoteText note="Free account holders will be able to access your content" />
            </Fragment>
          )}
        </View>

        <View
          style={{
            width: "100%",
            paddingHorizontal: 16,
          }}
        >
          <TouchableOpacity
            disabled={
              updating ||
              (acctType === "monetary" &&
                (!price || Number(price) < 1 || isNaN(Number(price))))
            }
            onPress={handleUpdateAccount}
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
              Update account
            </RgText>

            {updating && (
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

export default AccountConfigs;
