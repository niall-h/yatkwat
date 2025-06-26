"use client";

import { Locale } from "@/types/locale";
import { createContext, useContext } from "react";

export type Dictionary = {
  [namespace: string]: {
    [key: string]: string;
  };
};

interface LocaleContext {
  locale: Locale;
  dict: Dictionary;
}

const LocaleContext = createContext<LocaleContext | undefined>(undefined);

export const LocaleProvider = ({
  value,
  children,
}: {
  value: LocaleContext;
  children: React.ReactNode;
}) => {
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
};
