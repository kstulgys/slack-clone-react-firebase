import Store from "./index";

export const initialState = {
  value: 0
};

export default function useCounter() {
  const [{ count }, setState] = Store.useStore();
  const increment = () => {
    const newCount = { ...count, value: count.value + 1 };
    setState({ count: newCount });
  };

  const decrement = () => {
    const newCount = { ...count, value: count.value - 1 };
    setState({ count: newCount });
  };

  return [
    count,
    {
      increment,
      decrement
    }
  ];
}
