import React from "react";
import ReactDOM from "react-dom";
import StoreProvider from "./context/StoreContext";
import { useStore } from "./context/StoreContext";
import "./styles.css";

function App() {
  const [store, dispatch] = useStore();
  const inc = num => () => dispatch({ type: "inc", num });

  return (
    <div className="App">
      <h1>Counter Val {store.counter.value}</h1>
      <button onClick={inc(2)}>INC</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,

  rootElement
);
