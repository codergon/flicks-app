import React from "react";
import { useStorageState } from "hooks/useStorageState";

const AccountContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
  auth?: string | null;
  isLoading: boolean;
} | null>(null);

// This hook can be used to access the user info.
export function useAccount() {
  const value = React.useContext(AccountContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAccount must be wrapped in a <AccountProvider />");
    }
  }

  return value;
}

// Type definitions for props
type AccountProviderProps = {
  children: React.ReactNode;
};

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
