import bs58 from "bs58";
import axios from "axios";
import nacl from "tweetnacl";
import { Creator } from "typings/user";
import * as Linking from "expo-linking";
import Toast from "react-native-toast-message";
import { router, useSegments } from "expo-router";
import { useStorageState } from "hooks/useStorageState";
import React, { useCallback, useEffect, useState } from "react";
import { useLargeStorageState } from "hooks/useLargeStorageState";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  buildUrl,
  createAppLink,
  decryptPayload,
  encryptPayload,
} from "utils/phantom";
import { RecentSearches } from "typings/common";

const NETWORK = clusterApiUrl("mainnet-beta");

const onConnectRedirectLink = createAppLink("onConnect");
const onDisconnectRedirectLink = createAppLink("onDisconnect");
const onSignMessageRedirectLink = createAppLink("onSignMessage");
const onSignTransactionRedirectLink = createAppLink("onSignTransaction");
const onSignAndSendTransactionRedirectLink = createAppLink(
  "onSignAndSendTransaction"
);
const onSignAllTransactionsRedirectLink = createAppLink(
  "onSignAllTransactions"
);

export default function AccountProvider(props: AccountProviderProps) {
  const segments = useSegments();
  const insets = useSafeAreaInsets();
  const handleDeepLink = ({ url }: Linking.EventType) => setDeepLink(url);

  const [deepLink, setDeepLink] = useState<string>("");
  const [logs, setLogs] = useState<string[]>([]);
  const connection = new Connection(NETWORK);
  const addLog = useCallback(
    (log: string) => setLogs((logs) => [...logs, "> " + log]),
    []
  );

  // store dappKeyPair, sharedSecret, session and account SECURELY
  // on device to avoid having to reconnect users.
  const [dappKeyPair] = useState(nacl.box.keyPair());
  const [session, setSession] = useState<string>();
  const [sharedSecret, setSharedSecret] = useState<Uint8Array>();

  // create user
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [useDomainName, setUseDomainName] = useState(true);

  // user data
  const [isFetchingUser, setIsFetchingUser] = useState<boolean>(false);
  const [isRefetchingUser, setIsRefetchingUser] = useState<boolean>(false);
  const [phantomWalletPublicKey, setPhantomWalletPublicKey] =
    useState<PublicKey>();
  const [[isLoading, userData], setuserData] =
    useLargeStorageState<Creator>("userData");
  const [[isLoadingSig, userSignature], setUserSignature] =
    useStorageState<SignedMessage>("userSignature");

  const [[isLoadingSearches, recentSearches], setRecentSearches] =
    useLargeStorageState<RecentSearches>("recentSearches");

  // connect acct
  const [acctSNS, setAcctSNS] = useState<string>("");
  const [isFetchingSNS, setIsFetchingSNS] = useState<boolean>(false);
  const [isCheckingUser, setIsCheckingUser] = useState<boolean>(false);
  const [user, setUser] = useState<PrepareUserParams | null>(null);
  const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);

  // set deep link
  useEffect(() => {
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        setDeepLink(initialUrl);
      }
    })();
    Linking.addEventListener("url", handleDeepLink);
    return () => {};
  }, []);

  const fetchSNS = async (
    publicKey: PublicKey,
    connectData = {
      session,
      sharedSecret,
    }
  ) => {
    setIsFetchingSNS(true);
    try {
      const { data } = await axios.get(
        `https://flicks.hop.sh/domain/${publicKey?.toString()}`
      );
      setAcctSNS(data?.domainName);
    } catch (e) {
    } finally {
      setIsFetchingSNS(false);
      signMessage(connectData);
    }
  };

  // sign message
  const signMessage = async (
    connectData = {
      session,
      sharedSecret,
    }
  ) => {
    const message =
      "Message: Welcome to Flicks!\nURI: https://flicks.vercel.app";

    const payload = {
      session: connectData.session,
      message: bs58.encode(Buffer.from(message)),
    };

    const [nonce, encryptedPayload] = encryptPayload(
      payload,
      connectData.sharedSecret
    );

    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      nonce: bs58.encode(nonce),
      redirect_link: onSignMessageRedirectLink,
      payload: bs58.encode(encryptedPayload),
    });

    addLog("Signing message...");
    const url = buildUrl("signMessage", params);
    Linking.openURL(url);

    setIsCheckingUser(true);
  };

  // fetch user data
  const fetchUserData = async (isRefetch = false) => {
    if (!userSignature || isCheckingUser) return;

    if (!isRefetch) {
      setIsFetchingUser(true);
    } else {
      setIsRefetchingUser(true);
    }

    try {
      const { data } = await axios.get(
        `/creators/${userSignature?.publicKey}`,
        {
          headers: {
            Authorization: `Signature ${userSignature?.publicKey}:${userSignature?.signature}`,
          },
        }
      );

      if (data?.data) setuserData(data?.data);
    } catch (error: any) {
      console.log(error?.response?.data);
    } finally {
      if (!isRefetch) {
        setIsFetchingUser(false);
      }
      setIsRefetchingUser(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userSignature]);

  // create account
  const createAccount = async (userData = user) => {
    try {
      const { status } = await axios.post("/creators/", userData);
      if (status === 201) fetchUserData();
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

  // check if user exist
  const checkUser = async (signedUser = userSignature) => {
    if (!signedUser) return;
    try {
      const { data } = await axios.get(`/creators/${signedUser?.publicKey}`, {
        headers: {
          Authorization: `Signature ${signedUser?.publicKey}:${signedUser?.signature}`,
        },
      });

      if (data?.data) setuserData(data?.data);
    } catch (e) {
      router.replace("/(onboarding)/setup");
    } finally {
      setIsCheckingUser(false);
    }
  };

  // handle inbounds links
  useEffect(() => {
    if (!deepLink) return;

    const url = new URL(deepLink);
    const params = url.searchParams;

    if (params.get("errorCode")) {
      addLog(JSON.stringify(Object.fromEntries([...params]), null, 2));
      return;
    }

    if (/onConnect/.test(url.host)) {
      const sharedSecretDapp = nacl.box.before(
        bs58.decode(params.get("phantom_encryption_public_key")!),
        dappKeyPair.secretKey
      );

      const connectData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecretDapp
      );

      setSharedSecret(sharedSecretDapp);
      setSession(connectData.session);

      const public_key = new PublicKey(connectData.public_key);
      if (public_key) {
        setPhantomWalletPublicKey(public_key);
        fetchSNS(public_key, {
          session: connectData.session,
          sharedSecret: sharedSecretDapp,
        });
      }

      addLog(JSON.stringify(connectData, null, 2));
    } else if (/onSignMessage/.test(url.host)) {
      const signMessageData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecret
      );

      setUserSignature(signMessageData);
      setAuthorizationInProgress(false);

      checkUser(signMessageData);

      addLog(JSON.stringify(signMessageData, null, 2));
    }
  }, [deepLink]);

  // prepare user data
  const prepareUser = async (data: PrepareUserParams) => {
    const { image_url, banner_url, bio, moniker } = data;
    const user = {
      bio,
      moniker,
      image_url,
      banner_url:
        banner_url || "https://ik.imagekit.io/alphaknight/18_R3g07OvuJ.png",
      address: phantomWalletPublicKey?.toString(),
    };

    if (!user?.address) return;

    setIsCreatingAccount(true);
    setUser(user);
    createAccount(user);
  };

  // connect wallet to app and get account
  const connect = useCallback(async () => {
    try {
      if (authorizationInProgress) {
        return;
      }
      setAuthorizationInProgress(true);
      const params = new URLSearchParams({
        dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
        cluster: "mainnet-beta",
        app_url: "https://flicksapp.vercel.app",
        redirect_link: onConnectRedirectLink,
      });
      const url = buildUrl("connect", params);

      Linking.openURL(url);
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Error connecting wallet",
        text2: "There was an error connecting your wallet. Please try again",
        topOffset: insets.top + 10,
      });
    } finally {
      setAuthorizationInProgress(false);
    }
  }, [authorizationInProgress]);

  // disconnect wallet from app
  const disconnect = async () => {
    setuserData(null);
    setSession(undefined);
    setUserSignature();
    setPhantomWalletPublicKey(undefined);
    setSharedSecret(undefined);
    setAcctSNS("");
    setRecentSearches(null);
  };

  return (
    <AccountContext.Provider
      value={{
        acctSNS,
        connect,
        disconnect,
        isFetchingSNS,
        isCheckingUser,
        phantomWalletPublicKey,
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

  acctSNS: string;
  isFetchingSNS: boolean;
  isCheckingUser: boolean;
  isAuthenticating: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  authorizationInProgress: boolean;

  userData: Creator | null;
  userSignature: SignedMessage | null;
  phantomWalletPublicKey?: PublicKey;

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
