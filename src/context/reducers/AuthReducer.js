const initialState = {
  loggedIn: false
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case "LOG_AUTH_STATE":
      return state;
    default:
      return state;
  }
}
