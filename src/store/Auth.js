import Store from "./index";

const waait = async (sec = 3000) =>
  new Promise(resolve => setTimeout(resolve, sec));

export const initialState = {
  loading: false,
  isLoggedIn: false
};

export default function useAuth() {
  const [{ auth }, setState] = Store.useStore();

  const login = async auth => {
    setState(draft => {
      draft.auth.loading = true;
    });
    await waait(1000);
    setState(draft => {
      draft.auth.isLoggedIn = true;
      draft.auth.loading = false;
    });
  };

  const logout = auth => {
    setState(draft => {
      draft.auth.isLoggedIn = false;
    });
  };

  return [
    auth,
    {
      login,
      logout
    }
  ];
}
