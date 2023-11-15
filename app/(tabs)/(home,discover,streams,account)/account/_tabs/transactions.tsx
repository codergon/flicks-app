import axios from "axios";
import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftRight } from "lucide-react-native";
import EmptyState from "components/shared/emptyState";
import { useAccount } from "providers/AccountProvider";
import { Tabs } from "react-native-collapsible-tab-view";
import RefreshControl from "components/_common/RefreshControl";
import AccountTransactionItem from "components/account/transactionItem";

const AccountTransactons = () => {
  const { userSignature } = useAccount();
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, error, refetch } = useQuery(
    ["account-txns", userSignature?.publicKey],
    async () =>
      axios
        .get(`/transactions/`, {
          headers: {
            Authorization: `Signature ${userSignature?.publicKey}:${userSignature?.signature}`,
          },
        })
        .then((res) => res.data?.data?.results),
    {
      enabled: !!userSignature?.signature,
    }
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);

  if (isLoading || error || !data || data.length === 0)
    return (
      <Tabs.ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ width: "100%" }}
      >
        <EmptyState
          emptyIcon={
            <ArrowLeftRight size={34} color={"#000"} strokeWidth={1.4} />
          }
          error={error}
          isLoading={isLoading}
          data={{
            loadingText: "Loading transactions...",
            message: "No transactions found",
            errorMessage: "An error occured while loading transactions",
          }}
        />
      </Tabs.ScrollView>
    );

  return (
    <Tabs.FlatList
      data={data}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <AccountTransactionItem
            data={item}
            showBorder={index !== data.length - 1}
          />
        );
      }}
      contentContainerStyle={{
        paddingTop: 10,
        paddingBottom: 24,
        paddingHorizontal: 16,
      }}
      keyExtractor={(item: any) => item?.id}
    />
  );
};

export default AccountTransactons;
