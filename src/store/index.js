import React, { useMemo, useContext, createContext, useState } from "react";
import { useImmer } from "use-immer";

function makeStore() {
  const context = createContext();

  const Provider = ({ children, initialState = {} }) => {
    const [state, setState] = useImmer(initialState);

    const contextValue = useMemo(() => [state, setState], [state]);

    return <context.Provider value={contextValue}>{children}</context.Provider>;
  };

  const useStore = () => useContext(context);

  return {
    Provider,
    useStore
  };
}

export default makeStore();
