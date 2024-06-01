import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

type AppContext = {
  isLoggedIn: boolean;
  isLoading: boolean;
  stripePromise: Promise<Stripe | null>;
};
const stripePromise = loadStripe(STRIPE_PUB_KEY);

const AppContext = React.createContext<AppContext | undefined>({
  isLoggedIn: false,
  isLoading: true,
  stripePromise,
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
        stripePromise,
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
