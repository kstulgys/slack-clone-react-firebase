import React, { useEffect } from 'react';
import Store from './index';
import { firebaseAuth, firestore } from './firebase';
import md5 from 'md5';

export const initialState = {
  currentUser: null,
  isLoading: true,
  onlineStatus: false
};

export default function useAuth() {
  const [{ auth }, setState, history] = Store.useStore();

  const tryToLoginCurrentUser = () => {
    firebaseAuth.onAuthStateChanged(async user => {
      if (user) {
        await loginUser(user);
      } else {
        await signOutUser();
      }
    });
  };

  const loginUser = user => {
    changeOnlineStatus(user.uid, true);
    setState(draft => {
      draft.auth.currentUser = user;
      draft.auth.isLoading = false;
    });
    history.push('/');
  };

  const signOutUser = () => {
    if (auth.currentUser) {
      changeOnlineStatus(auth.currentUser.uid, false);
    }
    setState(draft => {
      draft.auth.currentUser = null;
      draft.auth.isLoading = false;
    });
    history.push('/auth');
  };

  const signin = async ({ email, password, username }) => {
    try {
      setState(draft => {
        draft.auth.isLoading = true;
      });
      const { user } = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await user.updateProfile({
        displayName: username,
        photoURL: `http://gravatar.com/avatar/${md5(user.email)}?d=identicon`
      });
      await createUserDocument(user);
    } catch (e) {
      console.error('e.message from signin', e.message);
    }
  };

  const login = async ({ email, password }) => {
    try {
      setState(draft => {
        draft.auth.isLoading = true;
      });
      await firebaseAuth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.error('e.message from login', e.message);
    }
  };

  const logout = () => {
    // setState(draft => {
    //   draft.auth.isLoading = true;
    // });
    try {
      firebaseAuth.signOut();
    } catch (e) {
      console.error('e.message from signin', e.message);
    }
  };

  const changeOnlineStatus = async (userId, trueOrFalse) => {
    try {
      const userRef = await firestore.doc(`users/${userId}`);
      await userRef.update({ isOnline: trueOrFalse });
    } catch (e) {
      console.error('e.message from updateUserStatus', e.message);
      // return null;
    }
  };

  const createUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();
      try {
        await userRef.set({
          isOnline: true,
          displayName,
          email,
          photoURL,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.error('Error creating user', console.error);
      }
    }

    return getUserDocument(user.uid);
  };

  const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
      return { uid, ...userDocument.data() };
    } catch (error) {
      console.error('Error fetching user', error.message);
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
