import React, { useContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";

const RouterContext = React.createContext({});

export const useRouter = () => useContext(RouterContext);

const CustomBrowserRouter = ({ children }) => (
  <BrowserRouter>
    <Route>
      {routeProps => (
        <RouterContext.Provider value={routeProps}>
          {children}
        </RouterContext.Provider>
      )}
    </Route>
  </BrowserRouter>
);

export default CustomBrowserRouter;
