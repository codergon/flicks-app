import { ScrollText } from "lucide-react-native";
import PostComment from "components/shared/comment";
import { useModals } from "providers/ModalsProvider";
import EmptyState from "components/shared/emptyState";
import { Tabs } from "react-native-collapsible-tab-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CommentsTab = () => {
  const insets = useSafeAreaInsets();
  const { postInteractions } = useModals();

  return (
    <>
      {postInteractions && postInteractions?.comments?.length > 0 ? (
        <Tabs.FlatList
          data={postInteractions?.comments}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return <PostComment comment={item} />;
          }}
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: 80 + insets.bottom,
          }}
        />
      ) : (
        <Tabs.ScrollView bounces={false}>
          <EmptyState
            icon={
              <>
                <ScrollText size={34} color="#555" strokeWidth={0.9} />
              </>
            }
            data={{
              message: "No comments yet",
            }}
          />
        </Tabs.ScrollView>
      )}
    </>
  );
};

export default CommentsTab;
