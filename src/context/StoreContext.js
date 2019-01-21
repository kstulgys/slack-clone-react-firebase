import React, { createContext, useContext, useMemo } from "react";
import rootReducer from "./reducers";
import { useImmerReducer } from "use-immer";
const StoreContext = createContext();
export const useStore = () => useContext(StoreContext);

export default function StoreProvider(props) {
  const initialState = rootReducer(props.initialValue, { type: "__INIT__" });
  const [store, dispatch] = useImmerReducer(rootReducer, initialState);
  const contextValue = useMemo(() => [store, dispatch], [store]);
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
}

// export default function Store(props) {
//   const initialState = props.rootReducer(props.initialValue, {
//     type: "__INIT__"
//   });
//   const [state, dispatch] = useReducer(props.rootReducer, initialState);
//   return (
//     <StoreContext.Provider value={[state, dispatch]}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// }
