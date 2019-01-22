import React, { useEffect } from "react";
import Store from "./index";

const waait = async (sec = 3000) =>
  new Promise(resolve => setTimeout(resolve, sec));

export const initialState = {
  currentUser: null,
  isLoading: true
};

export default function useAuth() {
  const [{ auth }, setState, history] = Store.useStore();

  const loginSuccess = () => {
    setState(draft => {
      draft.auth.currentUser = false;
      draft.auth.isLoading = false;
    });
    history.push("/");
  };

  const loginFail = () => {
    setState(draft => {
      draft.auth.currentUser = false;
      draft.auth.isLoading = false;
    });
    history.push("/auth");
  };

  const tryToLoginUser = async () => {
    const userToken = await localStorage.getItem("token");
    if (userToken === "valid token") {
      setState(draft => {
        draft.auth.isLoading = true;
      });
      await waait(3000);
      loginSuccess();
    } else {
      loginFail();
    }
  };

  const login = async () => {
    await localStorage.setItem("token", "valid token");
    tryToLoginUser();
  };

  const logout = async () => {
    await localStorage.removeItem("token");
    tryToLoginUser();
  };

  return [
    auth,
    {
      login,
      logout,
      tryToLoginUser
    }
  ];
}

// useEffect(() => {
//   tryToLoginUser(auth, userToken)
//     .then(() => history.push("/"))
//     .catch(e => history.push("/auth"));
// }, []);

// useEffect(() => {
//   try {
//     tryToLoginUser().then(res => history.push("/"));
//   } catch (e) {
//     history.push("/auth");
//   }
// }, []);

// const tryToLoginUser = auth =>
//   new Promise((resolve, reject) => {
//     setState(draft => {
//       draft.auth.loadingUser = true;
//     });
//     if (userToken == "valid token") {
//       loginSuccess();
//       resolve();
//     } else {
//       loginFail();
//       reject();
//     }
//   });
