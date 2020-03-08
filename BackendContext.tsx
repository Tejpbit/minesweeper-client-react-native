import React from "react";
import { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Backend } from "./src/backend";

export const BackendContext = createContext(null);

export const BackendProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [backend, _setBackend] = useState(
    new Backend("stats.zomis.net:8083", dispatch)
  );

  return (
    <BackendContext.Provider value={backend}>
      {children}
    </BackendContext.Provider>
  );
};
