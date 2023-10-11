import React, { useCallback, useEffect, useState } from "react";
import { useStorageState } from "hooks/useStorageState";

import { alertAndLog } from "utils/alertAndLog";
import nacl from "tweetnacl";
import bs58 from "bs58";
import * as Linking from "expo-linking";
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
import { router, useSegments } from "expo-router";

const NETWORK = clusterApiUrl("mainnet-beta");

const onConnectRedirectLink = createAppLink("onConnect");
const onDisconnectRedirectLink = createAppLink("onDisconnect");
const onSignAndSendTransactionRedirectLink = createAppLink(
  "onSignAndSendTransaction"
);
const onSignAllTransactionsRedirectLink = createAppLink(
  "onSignAllTransactions"
);
const onSignTransactionRedirectLink = createAppLink("onSignTransaction");
const onSignMessageRedirectLink = createAppLink("onSignMessage");

export default function AccountProvider(props: AccountProviderProps) {
  const segments = useSegments();

  const [deepLink, setDeepLink] = useState<string>("");
  const [logs, setLogs] = useState<string[]>([]);
  const connection = new Connection(NETWORK);
  const addLog = useCallback(
    (log: string) => setLogs((logs) => [...logs, "> " + log]),
    []
  );

  // store dappKeyPair, sharedSecret, session and account SECURELY on device
  // to avoid having to reconnect users.
  const [dappKeyPair] = useState(nacl.box.keyPair());
  const [sharedSecret, setSharedSecret] = useState<Uint8Array>();
  const [session, setSession] = useState<string>();

  // const [connectedAccount, setConnectedAccount] = useState<PublicKey>();

  const [[isLoading, connectedAccount], setConnectedAccount] =
    useStorageState("connectedAccount");

  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);

  const handleDeepLink = ({ url }: Linking.EventType) => setDeepLink(url);

  // setConnectedAccount();

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

  useEffect(() => {
    if (connectedAccount && segments[0] === "onboarding") {
      router.replace("/(tabs)/(home)/home");
    }
  }, [connectedAccount]);

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

      const acct = new PublicKey(connectData.public_key).toString();
      if (acct) setConnectedAccount(acct);

      // alertAndLog("Connected", JSON.stringify(connectData, null, 2));

      addLog(JSON.stringify(connectData, null, 2));
    }
  }, [deepLink]);

  const connect = useCallback(async () => {
    try {
      if (authorizationInProgress) {
        return;
      }
      setAuthorizationInProgress(true);
      const params = new URLSearchParams({
        dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
        cluster: "mainnet-beta",
        app_url: "https://phantom.app",
        redirect_link: onConnectRedirectLink,
      });
      const url = buildUrl("connect", params);

      Linking.openURL(url);
    } catch (err: any) {
      alertAndLog(
        "Error during connect",
        err instanceof Error ? err.message : err
      );
    } finally {
      setAuthorizationInProgress(false);
    }
  }, [authorizationInProgress]);

  const disconnect = async () => {
    const payload = {
      session,
    };
    const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);

    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      nonce: bs58.encode(nonce),
      redirect_link: onDisconnectRedirectLink,
      payload: bs58.encode(encryptedPayload),
    });

    const url = buildUrl("disconnect", params);
    Linking.openURL(url);
  };

  return (
    <AccountContext.Provider
      value={{
        connect,
        disconnect,
        connectedAccount,
        authorizationInProgress,
        isAuthenticating: isLoading,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
}

interface AccountContext {
  isAuthenticating: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  authorizationInProgress: boolean;
  // connectedAccount?: PublicKey;
  connectedAccount?: string | null;
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
