import React, { useEffect } from "react";
import Store from "./index";
import { firebaseAuth } from "./firebase";

const waait = async (sec = 500) =>
  new Promise(resolve => setTimeout(resolve, sec));

export const initialState = {
  currentUser: null,
  isLoading: true
};

export default function useAuth() {
  const [{ auth }, setState, history] = Store.useStore();

  const loginCurrentUser = ({ currentUser }) => {
    setState(draft => {
      draft.auth.currentUser = currentUser;
      draft.auth.isLoading = false;
    });
    history.push("/");
  };

  const signOutCurrentUser = () => {
    setState(draft => {
      draft.auth.currentUser = null;
      draft.auth.isLoading = false;
    });
    history.push("/auth");
  };

  const tryToLoginCurrentUser = () => {
    firebaseAuth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        loginCurrentUser({ currentUser });
      } else {
        signOutCurrentUser();
      }
    });
  };

  const signin = async ({ email, password }) => {
    setState(draft => {
      draft.auth.isLoading = true;
    });
    try {
      const currentUser = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      loginCurrentUser({ currentUser });
    } catch (e) {
      console.log(e.message);
      signOutCurrentUser();
    }
  };

  const login = async ({ email, password }) => {
    setState(draft => {
      draft.auth.isLoading = true;
    });
    try {
      const currentUser = await firebaseAuth.signInWithEmailAndPassword(
        email,
        password
      );
      loginCurrentUser({ currentUser });
    } catch (e) {
      console.log(e.message);
      signOutCurrentUser();
    }
  };

  const logout = async () => {
    setState(draft => {
      draft.auth.isLoading = true;
    });
    try {
      await firebaseAuth.signOut();
      signOutCurrentUser();
    } catch (e) {
      console.log(e);
      signOutCurrentUser();
    }
  };

  return [
    auth,
    {
      signin,
      login,
      logout,
      tryToLoginCurrentUser
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
