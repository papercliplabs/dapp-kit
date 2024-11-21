"use client";
import { createContext, ReactNode, useContext } from "react";

export interface DappKitContextType {
  apiUrl: string;
}

const DappKitContext = createContext<DappKitContextType>({
  apiUrl: "",
});

export interface DappKitProviderParams {
  apiUrl: string;
  children: ReactNode;
}

export function DappKitProvider({ apiUrl, children }: DappKitProviderParams) {
  return <DappKitContext.Provider value={{ apiUrl }}>{children}</DappKitContext.Provider>;
}

export function useDappKitContext() {
  return useContext(DappKitContext);
}
