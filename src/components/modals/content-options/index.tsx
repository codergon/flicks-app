import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useModals } from "providers/ModalsProvider";
import CustomBackground from "components/modals/custombackground";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Tabs, CollapsibleRef } from "react-native-collapsible-tab-view";

import StartStream from "./startStream";
import ContentOptions from "./contentOptions";

const ContentOptionsModal = () => {
  const insets = useSafeAreaInsets();
  const { createContentRef } = useModals();
  const tabsRef = useRef<CollapsibleRef<string>>(null);

  const [isSchedule, setIsSchedule] = useState(false);

  const snapPoints = useMemo(() => [300, 500], []);

  return (
    <BottomSheet
      index={-1}
      topInset={insets.top}
      enablePanDownToClose
      ref={createContentRef}
      snapPoints={snapPoints}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      onClose={() => {
        tabsRef?.current?.jumpToTab("options");
      }}
      handleStyle={{ backgroundColor: "transparent" }}
      handleIndicatorStyle={{ backgroundColor: "rgba(0,0,0,0.2)" }}
      backdropComponent={(props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      backgroundComponent={(props: BottomSheetBackdropProps) => (
        <CustomBackground {...props} />
      )}
    >
      <>
        <BottomSheetScrollView
          keyboardShouldPersistTaps="never"
          contentContainerStyle={[styles.container]}
        >
          <Tabs.Container
            lazy={false}
            ref={tabsRef}
            tabBarHeight={0}
            snapThreshold={0.5}
            renderTabBar={() => null}
            pagerProps={{ scrollEnabled: false }}
          >
            <Tabs.Tab name="options">
              <ContentOptions tabsRef={tabsRef} setIsSchedule={setIsSchedule} />
            </Tabs.Tab>
            <Tabs.Tab name="start-stream">
              <StartStream tabsRef={tabsRef} isSchedule={isSchedule} />
            </Tabs.Tab>
          </Tabs.Container>
        </BottomSheetScrollView>
      </>
    </BottomSheet>
  );
};

export default ContentOptionsModal;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    flex: 1,
    overflow: "hidden",
    position: "relative",
    flexDirection: "column",
  },
});
