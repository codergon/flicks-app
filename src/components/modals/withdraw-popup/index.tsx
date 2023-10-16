import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useMemo, useState } from "react";
import Layout from "constants/Layout";
import { Keyboard } from "react-native";
import WithdrawalPopup from "./withdrawalPopup";
import { useModals } from "providers/ModalsProvider";
import CustomBackground from "components/modals/custombackground";

const WithdrawalModal = () => {
  const { withdrawalRef } = useModals();
  const snapPoints = useMemo(
    () => [Math.min(Math.max(300, Layout.window.height * 0.4), 300)],
    []
  );

  const [price, setPrice] = useState("");

  return (
    <BottomSheet
      detached
      index={-1}
      enablePanDownToClose
      snapPoints={snapPoints}
      ref={withdrawalRef}
      handleComponent={() => null}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      onClose={() => {
        Keyboard.dismiss();
      }}
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
      <WithdrawalPopup price={price} setPrice={setPrice} />
    </BottomSheet>
  );
};

export default WithdrawalModal;
