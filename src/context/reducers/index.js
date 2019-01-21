import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import CounterReducer from "./CounterReducer";
export default combineReducers({
  auth: AuthReducer,
  counter: CounterReducer
});
