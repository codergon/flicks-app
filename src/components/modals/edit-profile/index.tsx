import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import Layout from "constants/layout";
import { Keyboard } from "react-native";
import AccountConfigs from "./accountConfigs";
import { useModals } from "providers/ModalsProvider";
import CustomBackground from "components/modals/custombackground";

const EditProfileModal = () => {
  const { updateAccountRef } = useModals();
  const snapPoints = useMemo(
    () => [Math.min(Math.max(340, Layout.window.height * 0.5), 400)],
    []
  );

  return (
    <BottomSheet
      detached
      // index={-1}
      index={0}
      enablePanDownToClose
      ref={updateAccountRef}
      snapPoints={snapPoints}
      handleComponent={() => null}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      onClose={() => Keyboard.dismiss()}
      handleIndicatorStyle={{
        backgroundColor: "rgba(0,0,0,0.2)",
      }}
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
      <AccountConfigs />
    </BottomSheet>
  );
};

export default EditProfileModal;
