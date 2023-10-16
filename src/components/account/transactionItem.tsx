import { padding } from "helpers/styles";
import { StyleSheet, View } from "react-native";
import { RgText } from "components/_ui/typography";

import { router } from "expo-router";
import { primaryColor } from "constants/Colors";
import { CreditCard, LockOpen } from "phosphor-react-native";
import { Banknote, Gift, Sparkles, Wallet } from "lucide-react-native";
import TimeAgo from "components/_common/TimeAgo";

interface ContentProps {
  data: any;
  showBorder?: boolean;
}

const AccountTransactionItem = ({ data, showBorder = true }: ContentProps) => {
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
        {data?.tx_type === "credit" ? (
          <Wallet size={iconSize} color={primaryColor} />
        ) : data?.tx_type === "debit" ? (
          <Banknote size={iconSize + 1} color={primaryColor} />
        ) : null}
      </View>

      <View style={[styles.details]}>
        <View
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <RgText style={[styles.title]}>{data?.narration}</RgText>
        </View>

        {data?.created_at && (
          <TimeAgo
            date={Date.parse(data?.created_at)}
            textStyle={{
              ...styles.date,
              color: "#676C75",
            }}
          />
        )}
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
