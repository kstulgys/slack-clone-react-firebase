import Store from './index';
import useOnlineStatus from '@rehooks/online-status';
import { firebaseAuth, firestore } from './firebase';
import md5 from 'md5';

// const waait = async (sec = 500) =>
//   new Promise(resolve => setTimeout(resolve, sec));

export const initialState = {
  currentUser: null,
  isLoading: true,
  onlineStatus: false
};

export default function useAuth() {
  const [{ auth }, setState, history] = Store.useStore();
  // const onlineStatus = useOnlineStatus()
  const loginCreatedUser = ({ user }) => {
    updateUserStatus(user.uid, true);
    setState(draft => {
      draft.auth.currentUser = user;
      draft.auth.isLoading = false;
    });
    history.push('/');
  };

  const signOutCurrentUser = () => {
    if (auth.currentUser) {
      updateUserStatus(auth.currentUser.uid, false);
    }
    setState(draft => {
      draft.auth.currentUser = null;
      draft.auth.isLoading = false;
    });
    history.push('/auth');
  };

  const tryToLoginCurrentUser = () => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        loginCreatedUser({ user });
      } else {
        signOutCurrentUser();
      }
    });
  };

  const signin = async ({ email, password, username }) => {
    try {
      setState(draft => {
        draft.auth.isLoading = true;
      });
      const createdUser = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      const updateUserProfile = await createdUser.user.updateProfile({
        displayName: username,
        photoURL: `http://gravatar.com/avatar/${md5(
          createdUser.user.email
        )}?d=identicon`
      });
      const user = await createUserDocument(createdUser.user);
      console.log('user saved', user);
    } catch (e) {
      console.log('e.message from signin', e.message);
      signOutCurrentUser();
    }
  };

  const login = async ({ email, password }) => {
    try {
      setState(draft => {
        draft.auth.isLoading = true;
      });
      const currentUser = await firebaseAuth.signInWithEmailAndPassword(
        email,
        password
      );
    } catch (e) {
      console.log('e.message from login', e.message);
      // signOutCurrentUser();
    }
  };

  const logout = () => {
    setState(draft => {
      draft.auth.isLoading = true;
    });
    try {
      firebaseAuth.signOut();
    } catch (e) {
      console.log('e.message from signin', e.message);
      // signOutCurrentUser();
    }
  };

  const updateUserStatus = async (userId, trueOrFalse) => {
    // console.log(userId);
    try {
      const userRef = await firestore.doc(`users/${userId}`);
      await userRef.update({ isOnline: trueOrFalse });
    } catch (e) {
      // console.log('e.message from updateUserStatus', e.message);
      return null;
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
      // const userDocument = await firestore
      //   .collection('users')
      //   .doc(uid)
      //   .get();

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
      tryToLoginCurrentUser,
      updateUserStatus
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
