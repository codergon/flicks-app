import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import Layout from "constants/Layout";
import { Keyboard } from "react-native";
import { useMemo, useState } from "react";
import DepositAddresses from "./depositAddresses";
import { useModals } from "providers/ModalsProvider";
import CustomBackground from "components/modals/custombackground";

const DepositAddressesModal = () => {
  const { depositAddressesRef } = useModals();
  const snapPoints = useMemo(
    () => [Math.min(Math.max(600, Layout.window.height * 0.8), 600)],
    []
  );

  const [openOtherChains, setOpenOtherChains] = useState(false);

  return (
    <BottomSheet
      detached
      index={-1}
      enablePanDownToClose
      snapPoints={snapPoints}
      ref={depositAddressesRef}
      handleComponent={() => null}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      onClose={() => {
        setOpenOtherChains(false);
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
      <DepositAddresses
        openOtherChains={openOtherChains}
        setOpenOtherChains={setOpenOtherChains}
      />
    </BottomSheet>
  );
};

export default DepositAddressesModal;
