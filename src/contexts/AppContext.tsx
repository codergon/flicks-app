import React, {
  useState,
  ReactNode,
  useContext,
  ReactElement,
  createContext,
} from "react";

const AppContext = createContext({});

// This hook can be used to
export function useApp() {
  const value = React.useContext(AppContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useApp must be wrapped in a <AppProvider />");
    }
  }

  return value;
}

// Type definitions for props
type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
