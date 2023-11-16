import axios from "axios";
import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Text } from "components/_ui/typography";
import { ArrowLeftRight } from "lucide-react-native";
import { useCallback, useMemo, useState } from "react";
import EmptyState from "components/shared/emptyState";
import { useAccount } from "providers/AccountProvider";
import { Tabs } from "react-native-collapsible-tab-view";
import LiveStreamItem from "components/account/streamItem";
import RefreshControl from "components/_common/RefreshControl";
import dayjs from "dayjs";

const AccountStreams = () => {
  const datas = [
    {
      id: 1,
      type: "free",
    },
    {
      id: 2,
      type: "paid",
    },
  ];

  const { userSignature } = useAccount();
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, error, refetch } = useQuery(
    ["account-streams", userSignature],
    async () =>
      axios
        .get("/contents/livestreams", {
          headers: {
            Authorization: `Signature ${userSignature}`,
          },
        })
        .then((res) => res.data?.data?.results),
    {
      enabled: !!userSignature,
    }
  );

  const groupedStreams = useMemo(() => {
    if (!data) return [];

    const grouped = data.reduce((acc: any, curr: any) => {
      const date = new Date(curr?.start);
      const key = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr);
      return acc;
    }, {}) as any[];

    return Object.entries(grouped).map(([key, value]) => ({
      date: key,
      dayOfTheWeek: dayjs(value[0]?.start).format("dddd"),
      dateOfTheMonth: dayjs(value[0]?.start).format("MMMM DD"),
      data: value,
    }));
  }, [data]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);

  if (isLoading || error || !data || data.length === 0) {
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
            loadingText: "Fetching streams...",
            message: "No stream created yet",
            errorMessage: "An error occured while loading streams",
          }}
        />
      </Tabs.ScrollView>
    );
  }

  return (
    <>
      <Tabs.SectionList
        sections={groupedStreams}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 24,
          paddingHorizontal: 22,
        }}
        renderItem={({ item, index, section }) => {
          return (
            <LiveStreamItem
              item={item}
              key={index}
              isLastItem={index === section?.data.length - 1}
            />
          );
        }}
        renderSectionHeader={({
          section: { dayOfTheWeek, dateOfTheMonth },
        }) => {
          return (
            <View
              style={{
                gap: 5,
                paddingTop: 10,
                marginBottom: 6,
                paddingBottom: 10,
                borderColor: "#ddd",
                borderBottomWidth: 1,
                paddingHorizontal: 0,
                flexDirection: "column",
              }}
            >
              <Text
                style={[
                  {
                    fontSize: 14,
                    color: "#676C75",
                  },
                ]}
              >
                {dayOfTheWeek}
              </Text>
              <Text
                style={[
                  {
                    fontSize: 20,
                    color: "#000",
                  },
                ]}
              >
                {dateOfTheMonth}
              </Text>
            </View>
          );
        }}
      />
    </>
  );
};

export default AccountStreams;
