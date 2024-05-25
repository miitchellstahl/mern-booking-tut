import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

type AppContext = {
  isLoggedIn: boolean;
  isLoading: boolean;
};

const AppContext = React.createContext<AppContext | undefined>({
  isLoggedIn: false,
  isLoading: true,
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoading } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
    onSuccess: () => {
      setIsLoggedIn(true);
    },
    onError: () => {
      setIsLoggedIn(false);
    },
  });

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
