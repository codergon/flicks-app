import axios from "axios";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Creator } from "typings/user";
import * as Linking from "expo-linking";
import Toast from "react-native-toast-message";
import { RecentSearches } from "typings/common";
import { useStorageState } from "hooks/useStorageState";
import React, { useCallback, useEffect, useState } from "react";
import { useLargeStorageState } from "hooks/useLargeStorageState";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AccountProvider(props: AccountProviderProps) {
  const insets = useSafeAreaInsets();
  const [deepLink, setDeepLink] = useState<string>("");
  const handleDeepLink = ({ url }: Linking.EventType) => setDeepLink(url);

  // create user
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [useDomainName, setUseDomainName] = useState(true);

  // status states
  const [isFetchingANS, setIsFetchingANS] = useState<boolean>(false);
  const [isCheckingUser, setIsCheckingUser] = useState<boolean>(false);
  const [isFetchingUser, setIsFetchingUser] = useState<boolean>(false);
  const [isRefetchingUser, setIsRefetchingUser] = useState<boolean>(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);

  // connect acct
  const [acctANS, setAcctANS] = useState<string>("");
  const [mnemonicAddress, setMnemonicAddress] = useState("");
  const [user, setUser] = useState<PrepareUserParams | null>(null);

  // stored data
  const [[isLoading, userData], setuserData] =
    useLargeStorageState<Creator>("userData");

  const [[isLoadingSig, userSignature], setUserSignature] =
    useStorageState<string>("userSignature");

  const [_, setRecentSearches] =
    useLargeStorageState<RecentSearches>("recentSearches");

  // clear cache
  const clearCache = async () => {
    try {
      await Image.clearDiskCache();
      await Image.clearMemoryCache();
    } catch (error) {
      console.error(error);
    }
  };

  // fetch user data
  const fetchUserData = async (
    isRefetch = false,
    address = userData?.address
  ) => {
    if (isCheckingUser || !address) return;

    if (!isRefetch) {
      setIsFetchingUser(true);
    } else {
      setIsRefetchingUser(true);
    }

    try {
      const { data } = await axios.get(`/creators/${address}`);
      if (data?.data) {
        setuserData(data?.data);
        setUserSignature(address);
      }
    } catch (error: any) {
      console.log(error?.response?.data);
    } finally {
      if (!isRefetch) {
        setIsFetchingUser(false);
      }
      setIsRefetchingUser(false);
    }
  };

  // set deep link & fetch user data
  useEffect(() => {
    fetchUserData();

    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        setDeepLink(initialUrl);
      }
    })();

    clearCache();

    Linking.addEventListener("url", handleDeepLink);
    return () => {
      clearCache();
    };
  }, []);

  // fetch ans
  const fetchANS = async (address: string) => {
    setIsFetchingANS(true);
    try {
      const { data } = await axios.get(
        `/creators/nfdomains/resolve/${address?.toString()}`
      );
      if (data?.name) setAcctANS(data?.name);
    } catch (e) {
    } finally {
      setIsFetchingANS(false);
    }
  };

  // check if user exist
  const checkUser = async (address: string) => {
    try {
      const { data } = await axios.get(`/creators/${address}`);
      if (data?.data) {
        setuserData(data?.data);
        setUserSignature(address);
      }
    } catch (e) {
      router.replace("/(onboarding)/setup");
    } finally {
      setIsCheckingUser(false);
    }
  };

  // connect wallet to app and get account
  const connectWallet = useCallback(
    async (address: string) => {
      try {
        if (authorizationInProgress || !address) return;
        setAuthorizationInProgress(true);
        setMnemonicAddress(address);
        await fetchANS(address);
        await checkUser(address);
      } catch (e) {
      } finally {
        setAuthorizationInProgress(false);
      }
    },
    [authorizationInProgress]
  );

  // create account
  const createAccount = async (userData = user) => {
    try {
      const { status } = await axios.post("/creators/", userData);
      if (status === 201) fetchUserData(false, userData?.address);
    } catch (error: any) {
      console.log("error: ", error?.response?.data);

      Toast.show({
        type: "error",
        text1: "Error creating account",
        text2: "There was an error creating your account. Please try again",
        topOffset: insets.top + 10,
      });
    } finally {
      setIsCreatingAccount(false);
    }
  };

  // prepare user data
  const prepareUser = async (data: PrepareUserParams) => {
    const { image_url, banner_url, bio, moniker } = data;
    const user = {
      bio,
      moniker,
      image_url,
      address: mnemonicAddress,
      banner_url:
        banner_url || "https://ik.imagekit.io/alphaknight/18_R3g07OvuJ.png",
    };

    if (!user?.address) return;

    setIsCreatingAccount(true);
    setUser(user);
    createAccount(user);
  };

  // disconnect wallet from app
  const disconnect = async () => {
    setAcctANS("");
    setuserData(null);
    setUserSignature(null);
    setRecentSearches(null);
  };

  return (
    <AccountContext.Provider
      value={{
        acctANS,
        connectWallet,
        disconnect,
        isFetchingANS,
        isCheckingUser,
        authorizationInProgress,
        isAuthenticating: isLoading || isLoadingSig || isFetchingUser,

        prepareUser,
        isCreatingAccount,

        fetchUserData,
        isRefetchingUser,

        bio,
        setBio,
        username,
        setUsername,
        useDomainName,
        setUseDomainName,

        userData,
        userSignature,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
}

interface SignedMessage {
  publicKey: string;
  signature: string;
}

interface PrepareUserParams {
  bio: string;
  moniker: string;
  address?: string;
  image_url: string;
  banner_url?: string;
}

interface AccountContext {
  bio: string;
  username: string;
  useDomainName: boolean;
  setBio: (bio: string) => void;
  setUsername: (username: string) => void;
  setUseDomainName: (useDomainName: boolean) => void;

  isRefetchingUser: boolean;
  fetchUserData: (isRefetch?: boolean) => Promise<void>;

  acctANS: string;
  isFetchingANS: boolean;
  isCheckingUser: boolean;
  isAuthenticating: boolean;
  connectWallet: (addr: string) => Promise<void>;
  disconnect: () => Promise<void>;
  authorizationInProgress: boolean;

  userData: Creator | null;
  userSignature: string | null;

  isCreatingAccount: boolean;
  prepareUser: (data: PrepareUserParams) => Promise<void>;
}

type AccountProviderProps = {
  children: React.ReactNode;
};

const AccountContext = React.createContext({} as AccountContext);

export function useAccount() {
  const value = React.useContext(AccountContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAccount must be wrapped in a <AccountProvider />");
    }
  }
  return value;
}
