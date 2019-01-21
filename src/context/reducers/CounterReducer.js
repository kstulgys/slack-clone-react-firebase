const initialState = {
  value: 0
};

export default function CounterReducer(state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case "inc":
      state.value = state.value + action.num;
      return state;
    case "dec":
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
}
