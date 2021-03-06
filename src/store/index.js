import React, { useMemo, useContext, createContext, useState } from 'react';
import { withRouter, BrowserRouter } from 'react-router-dom';
import { useImmer } from 'use-immer';

function makeStore() {
  const context = createContext();

  const Provider = ({ children, initialState = {}, history }) => {
    // console.log(history);
    const [state, setState] = useImmer(initialState);
    let contextValue = useMemo(() => [state, setState, history], [state]);

    return <context.Provider value={contextValue}>{children}</context.Provider>;
  };

  const useStore = () => useContext(context);
  const ProviderWithRouter = withRouter(Provider);

  return {
    ProviderWithRouter,
    useStore
  };
}

export default makeStore();
