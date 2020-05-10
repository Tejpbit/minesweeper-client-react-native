import React, { useContext } from "react";
import { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { createBackend } from "./src/backend";

export const BackendContext = createContext<{
  send: (message: string) => void;
}>(null as any);

export const useBackend = () => useContext(BackendContext);

export const BackendProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const [backend] = useState(createBackend("stats.zomis.net:8083", dispatch));

  return (
    <BackendContext.Provider value={backend}>
      {children}
    </BackendContext.Provider>
  );
};
