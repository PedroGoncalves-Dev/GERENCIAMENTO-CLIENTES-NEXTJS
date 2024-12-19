"use client";
import { Iclients } from "@/data-access/clients/get-all";
import { createContext, useContext, useState } from "react";

interface IuserContext {
  client: Iclients | null;
  setClient: (client: Iclients) => void;
}

const ClientContext = createContext<IuserContext>({
  client: null,
  setClient: () => {},
});

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState<Iclients | null>(null);

  return (
    <ClientContext.Provider value={{ client, setClient }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient deve ser usado dentro de um ClientProvider");
  }
  return context;
};
