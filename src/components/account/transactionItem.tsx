import { padding } from "helpers/styles";
import { StyleSheet, View } from "react-native";
import { RgText } from "components/_ui/typography";

import { router } from "expo-router";
import { primaryColor } from "constants/Colors";
import { CreditCard, LockOpen } from "phosphor-react-native";
import { Banknote, Gift, Sparkles, Wallet } from "lucide-react-native";

interface ContentProps {
  item: any;
  showBorder?: boolean;
}

const AccountTransactionItem = ({ item, showBorder = true }: ContentProps) => {
  const iconSize = 17;
  return (
    <View
      style={[
        styles.content,
        {
          borderColor: "#f4f4f4",
          borderBottomWidth: showBorder ? 1 : 0,
        },
      ]}
    >
      <View
        style={[
          styles.transactionIcon,
          {
            backgroundColor: "#f4f4f4",
          },
        ]}
      >
        {item?.type === "deposit" ? (
          <Wallet size={iconSize} color={primaryColor} />
        ) : item?.type === "withdrawal" ? (
          <Banknote size={iconSize + 1} color={primaryColor} />
        ) : item?.for === "tip" ? (
          <Gift size={iconSize} color={primaryColor} />
        ) : item?.for === "wishlist" ? (
          <Sparkles size={iconSize} color={primaryColor} />
        ) : item?.for === "subscription" ? (
          <CreditCard weight="bold" size={iconSize} color={primaryColor} />
        ) : item?.for === "purchase" ? (
          <LockOpen weight="bold" size={iconSize} color={primaryColor} />
        ) : null}
      </View>

      <View style={[styles.details]}>
        <View
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {
            // Deposit & withdrawals
            item?.type === "deposit" ? (
              <RgText style={[styles.title, {}]}>
                Deposit: Added ${item?.amount} to your wallet
              </RgText>
            ) : item?.type === "withdrawal" ? (
              <RgText style={[styles.title, {}]}>
                Withdrawal: Sent ${item?.amount} to your bank account.
              </RgText>
            ) : // Tips sent and received
            item?.for === "tip" && item?.type === "credit" ? (
              <RgText style={[styles.title]}>
                Credit:{" "}
                <RgText
                  onPress={() => {
                    router.push(`/(tabs)/(account)/2345`);
                  }}
                  style={[styles.title, { color: primaryColor }]}
                >
                  @{item?.from}
                </RgText>{" "}
                you a {item?.tip_item} gift
              </RgText>
            ) : item?.for === "tip" && item?.type === "debit" ? (
              <RgText style={[styles.title]}>
                You tipped{" "}
                <RgText
                  onPress={() => {
                    router.push(`/(tabs)/(account)/2345`);
                  }}
                  style={[styles.title, { color: primaryColor }]}
                >
                  @{item?.to}
                </RgText>{" "}
                a {item?.tip_item} gift
              </RgText>
            ) : // Wishist transactions
            item?.for === "wishlist" && item?.type === "credit" ? (
              <RgText style={[styles.title]}>
                <RgText
                  onPress={() => {
                    router.push(`/(tabs)/(account)/2345`);
                  }}
                  style={[styles.title, { color: primaryColor }]}
                >
                  @{item?.from}
                </RgText>{" "}
                cleared an item from your wishlist
              </RgText>
            ) : item?.for === "wishlist" && item?.type === "debit" ? (
              <RgText style={[styles.title]}>
                You cleared an item from{" "}
                <RgText
                  onPress={() => {
                    router.push(`/(tabs)/(account)/2345`);
                  }}
                  style={[styles.title, { color: primaryColor }]}
                >
                  @{item?.to}
                </RgText>{" "}
                wishlist
              </RgText>
            ) : // Subscriptions
            item?.for === "subscription" && item?.type === "credit" ? (
              <RgText style={[styles.title]}>
                <RgText
                  onPress={() => {
                    router.push(`/(tabs)/(account)/2345`);
                  }}
                  style={[styles.title, { color: primaryColor }]}
                >
                  @{item?.from}
                </RgText>{" "}
                subscribed to your content
              </RgText>
            ) : item?.for === "subscription" && item?.type === "debit" ? (
              <RgText style={[styles.title]}>
                You renewed your subscription to{" "}
                <RgText
                  onPress={() => {
                    router.push(`/(tabs)/(account)/2345`);
                  }}
                  style={[styles.title, { color: primaryColor }]}
                >
                  @{item?.to}
                </RgText>
              </RgText>
            ) : // Purchased contents
            item?.for === "purchase" && item?.type === "credit" ? (
              <RgText style={[styles.title]}>
                <RgText
                  onPress={() => {
                    router.push(`/(tabs)/(account)/2345`);
                  }}
                  style={[styles.title, { color: primaryColor }]}
                >
                  @{item?.from}
                </RgText>{" "}
                paid ${item?.amount} to unlock your content
              </RgText>
            ) : item?.for === "purchase" && item?.type === "debit" ? (
              <RgText style={[styles.title]}>
                You paid ${item?.amount} to unlock{" "}
                <RgText
                  onPress={() => {
                    router.push(`/(tabs)/(account)/2345`);
                  }}
                  style={[styles.title, { color: primaryColor }]}
                >
                  @{item?.to}
                </RgText>{" "}
                content
              </RgText>
            ) : null
          }
        </View>

        <RgText
          numberOfLines={1}
          style={[
            styles.date,
            {
              color: "#676C75",
            },
          ]}
        >
          17 Sep, 2023 . 13:00PM
        </RgText>
      </View>
    </View>
  );
};

export default AccountTransactionItem;

const styles = StyleSheet.create({
  content: {
    gap: 16,
    ...padding(16, 0),
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
  },

  transactionIcon: {
    width: 42,
    height: 42,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  details: {
    gap: 4,
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 14,
  },
  date: {
    fontSize: 11,
    marginBottom: 2,
  },
});
