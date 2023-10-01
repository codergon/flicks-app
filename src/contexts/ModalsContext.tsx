import { useRef, ReactNode, useContext, createContext } from "react";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";

type ModalsProviderProps = {
  children: ReactNode;
};

interface ModalsContext {
  createContentRef: React.MutableRefObject<BottomSheet | null>;
  openCreateContentModal: () => void;
  closeCreateContentModal: () => void;
}

const ModalsContext = createContext({} as ModalsContext);

export function useModals() {
  const value = useContext(ModalsContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useApp must be wrapped in a <ModalsProvider />");
    }
  }
  return value;
}

const ModalsProvider = ({ children }: ModalsProviderProps) => {
  const createContentRef = useRef<BottomSheet>(null);

  const openCreateContentModal = () => {
    createContentRef.current?.expand();
  };
  const closeCreateContentModal = () => {
    createContentRef.current?.close();
  };

  return (
    <ModalsContext.Provider
      value={{
        createContentRef,
        openCreateContentModal,
        closeCreateContentModal,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};

export default ModalsProvider;
