import { nanoid } from "nanoid";
import { useApp } from "./AppProvider";
import { IPostComment } from "typings/post";
import Toast from "react-native-toast-message";
import { useAccount } from "./AccountProvider";
import { useRef, ReactNode, useContext, createContext, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ModalsProvider = ({ children }: ModalsProviderProps) => {
  const { userData } = useAccount();
  const insets = useSafeAreaInsets();
  const { handleComment, usersPostQuery } = useApp();

  const createContentRef = useRef<BottomSheet>(null);
  const updateAccountRef = useRef<BottomSheet>(null);
  const depositAddressesRef = useRef<BottomSheet>(null);
  const postInteractionsRef = useRef<BottomSheet>(null);
  const withdrawalRef = useRef<BottomSheet>(null);

  const [postInteractions, setPostInteractions] = useState<{
    postId?: string;
    comments: IPostComment[];
  } | null>(null);

  // create content
  const openCreateContentModal = () => {
    createContentRef.current?.snapToIndex(0);
  };
  const closeCreateContentModal = () => {
    createContentRef.current?.close();
  };

  // post interactions
  const openPostIntractionsModal = (details: PostInteractionsModalProps) => {
    setPostInteractions(details.data);
    postInteractionsRef.current?.snapToIndex(0);
  };
  const onClosePostIntractionsModal = () => {
    setPostInteractions(null);
  };
  const closePostIntractionsModal = () => {
    postInteractionsRef.current?.close();
    onClosePostIntractionsModal();
  };

  // update account
  const openUpdateAccountModal = () => {
    updateAccountRef.current?.expand();
  };
  const closeUpdateAccountModal = () => {
    updateAccountRef.current?.close();
  };

  // show deposit addresses
  const openDepositAddressesModal = () => {
    depositAddressesRef.current?.expand();
  };
  const closeDepositAddressesModal = () => {
    depositAddressesRef.current?.close();
  };

  // show withdrawal modal
  const openWithdrawalModal = () => {
    withdrawalRef.current?.expand();
  };
  const closeWithdrawalModal = () => {
    withdrawalRef.current?.close();
  };

  // handle commenting on posts
  const [isCommenting, setIsCommenting] = useState(false);
  const addComment = async (comment: string, onSuccess?: () => void) => {
    if (!userData || !postInteractions?.postId) return;

    setIsCommenting(true);

    try {
      await handleComment(postInteractions?.postId, comment);

      onSuccess && onSuccess();
      await usersPostQuery.refetch();
      setPostInteractions((p) => ({
        ...p,
        comments: [
          {
            id: nanoid(),
            message: comment,
            author: {
              id: userData.id,
              moniker: userData.moniker,
              address: userData.address,
              image_url: userData.image_url,
              is_verified: userData.is_verified,
              subscription_type: userData.subscription_type,
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          ...(p?.comments || []),
        ],
      }));
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        topOffset: insets.top + 10,
        text2: "Something went wrong while commenting on this post",
      });
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <ModalsContext.Provider
      value={{
        postInteractions,

        createContentRef,
        openCreateContentModal,
        closeCreateContentModal,

        addComment,
        isCommenting,
        postInteractionsRef,
        openPostIntractionsModal,
        closePostIntractionsModal,
        onClosePostIntractionsModal,

        updateAccountRef,
        openUpdateAccountModal,
        closeUpdateAccountModal,

        depositAddressesRef,
        openDepositAddressesModal,
        closeDepositAddressesModal,

        withdrawalRef,
        openWithdrawalModal,
        closeWithdrawalModal,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};

export default ModalsProvider;

interface PostInteractionsModalProps {
  type: "comments" | "likes" | "tips";
  data: {
    postId: string;
    comments: IPostComment[];
  };
}

type ModalsProviderProps = {
  children: ReactNode;
};

interface ModalsContext {
  withdrawalRef: React.MutableRefObject<BottomSheet | null>;
  openWithdrawalModal: () => void;
  closeWithdrawalModal: () => void;

  postInteractions: {
    comments: IPostComment[];
  } | null;
  createContentRef: React.MutableRefObject<BottomSheet | null>;
  openCreateContentModal: () => void;
  closeCreateContentModal: () => void;

  isCommenting: boolean;
  addComment: (comment: string, onSuccess?: () => void) => Promise<void>;
  postInteractionsRef: React.MutableRefObject<BottomSheet | null>;
  openPostIntractionsModal: (config: PostInteractionsModalProps) => void;
  closePostIntractionsModal: () => void;
  onClosePostIntractionsModal: () => void;

  updateAccountRef: React.MutableRefObject<BottomSheet | null>;
  openUpdateAccountModal: () => void;
  closeUpdateAccountModal: () => void;

  depositAddressesRef: React.MutableRefObject<BottomSheet | null>;
  openDepositAddressesModal: () => void;
  closeDepositAddressesModal: () => void;
}

const ModalsContext = createContext({} as ModalsContext);

export function useModals() {
  const value = useContext(ModalsContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useModals must be wrapped in a <ModalsProvider />");
    }
  }
  return value;
}
