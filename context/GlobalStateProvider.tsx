import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { GlobalStateType } from "./GlobalContextTypes";

type GlobalStateProviderProps = PropsWithChildren<{}>;

const GlobalStateContext = createContext<GlobalStateType | undefined>(
  undefined
);

const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}: GlobalStateProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const value: GlobalStateType = {
    loading,
    setLoading,
    loggedIn,
    setLoggedIn,
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = (): GlobalStateType => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

export { GlobalStateProvider, useGlobalState };
