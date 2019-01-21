import React from "react";
import ReactDOM from "react-dom";
import Store from "./store";
import AuthUserForm from "./components/AuthUserForm";
import { initialState as count } from "./store/Counter";
import { initialState as auth } from "./store/Auth";
import "./styles.css";

const initialState = {
  count,
  auth
};

function App() {
  return (
    <div className="App">
      <AuthUserForm />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Store.Provider initialState={initialState}>
    <App />
  </Store.Provider>,
  rootElement
);
