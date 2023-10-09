import React from "react";
import { useStorageState } from "hooks/useStorageState";

type AccountProviderProps = {
  children: React.ReactNode;
};

interface AccountContext {
  isLoading: boolean;
  signIn: () => void;
  signOut: () => void;
  auth?: string | null;
}

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

export default function AccountProvider(props: AccountProviderProps) {
  const [[isLoading, auth], setAuth] = useStorageState("auth");

  return (
    <AccountContext.Provider
      value={{
        signIn: () => {
          setAuth("xxx");
        },
        signOut: () => {
          setAuth(null);
        },

        auth,
        isLoading,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
}
