"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Currency = "USD" | "EUR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  conversionRate: number;
  formatPrice: (amount: number) => string;
  convertPrice: (amount: number) => number;
}

const CONVERSION_RATE = 0.92; // 1 USD = 0.92 EUR

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    const savedCurrency = localStorage.getItem("cisco_currency") as Currency;
    if (savedCurrency && (savedCurrency === "USD" || savedCurrency === "EUR")) {
      setCurrencyState(savedCurrency);
    }
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("cisco_currency", newCurrency);
  };

  const convertPrice = (amount: number) => {
    if (currency === "USD") return amount;
    return amount * CONVERSION_RATE;
  };

  const formatPrice = (amount: number) => {
    const convertedAmount = convertPrice(amount);
    
    if (currency === "USD") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(convertedAmount);
    } else {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(convertedAmount);
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        conversionRate: CONVERSION_RATE,
        formatPrice,
        convertPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
