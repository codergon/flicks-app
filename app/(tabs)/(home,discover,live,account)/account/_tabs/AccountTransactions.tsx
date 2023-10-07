import { Tabs } from "react-native-collapsible-tab-view";
import AccountTransactionItem from "components/account/transactionItem";

const AccountTransactons = () => {
  const data = [
    {
      id: 1,
      type: "deposit",
      amount: 50,
    },
    {
      id: 2,
      type: "withdrawal",
      amount: 20,
    },
    {
      id: 3,
      type: "credit",
      amount: 10,
      for: "tip",
      from: "Johnpxl_",
      tip_item: "coffee",
    },
    {
      id: 4,
      type: "debit",
      amount: 10,
      to: "sandra",
      for: "tip",
      tip_item: "mug",
    },
    {
      id: 5,
      type: "debit",
      amount: 15,
      to: "bumble",
      for: "wishlist",
    },
    {
      id: 6,
      type: "credit",
      amount: 12,
      for: "wishlist",
      from: "marie",
    },
    {
      id: 7,
      type: "debit",
      amount: 15,
      to: "sertysol",
      for: "subscription",
    },
    {
      id: 8,
      type: "credit",
      amount: 12,
      for: "subscription",
      from: "janedoe",
    },
    {
      id: 9,
      type: "debit",
      amount: 24,
      to: "muchay",
      for: "purchase",
    },
    {
      id: 10,
      type: "credit",
      amount: 17,
      for: "purchase",
      from: "pluto",
    },
  ];

  return (
    <Tabs.FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <AccountTransactionItem
            item={item}
            showBorder={index !== data.length - 1}
          />
        );
      }}
      contentContainerStyle={{
        paddingTop: 10,
        paddingBottom: 24,
        paddingHorizontal: 16,
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default AccountTransactons;
