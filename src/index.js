import "semantic-ui-css/semantic.min.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Store from "./store";
import AuthUserForm from "./components/AuthUserForm";
import AppLayout from "./components/AppLayout";
import useAuth from "./store/Auth";
import { firebaseAuth } from "./store/firebase";
import { Dimmer, Loader } from "semantic-ui-react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
// import CustomBrowserRouter from "./utils/CustomBrowserRouter";
// import { useRouter } from "./utils/CustomBrowserRouter";

import { initialState as channel } from "./store/Channel";
import { initialState as auth } from "./store/Auth";
import { initialState as message } from "./store/Message";

import "./styles.css";

const initialState = {
  channel,
  auth,
  message
};

function Root() {
  const [auth, { tryToLoginCurrentUser }] = useAuth();
  const [{ channel, message }, setState, history] = Store.useStore();
  // console.log({ ...channel, ...message, ...auth });
  useEffect(() => {
    tryToLoginCurrentUser();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={AppLayout} />
        <Route exact path="/auth" component={AuthUserForm} />
        <Route path="*" component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Store.ProviderWithRouter initialState={initialState}>
      <Root />
    </Store.ProviderWithRouter>
  </BrowserRouter>,
  rootElement
);

// <CustomBrowserRouter>
//   <Store.Provider initialState={initialState}>
//     <Root />
//   </Store.Provider>
// </CustomBrowserRouter> ,
