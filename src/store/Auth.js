import Store from "./index";
import { firebaseAuth, firestore } from "./firebase";
import md5 from "md5";

// const waait = async (sec = 500) =>
//   new Promise(resolve => setTimeout(resolve, sec));

export const initialState = {
  currentUser: null,
  isLoading: true
};

export default function useAuth() {
  const [{ auth }, setState, history] = Store.useStore();

  const loginCreatedUser = ({ createdUser }) => {
    setState(draft => {
      draft.auth.currentUser = createdUser;
      draft.auth.isLoading = false;
    });
  };

  const signOutCurrentUser = () => {
    setState(draft => {
      draft.auth.currentUser = null;
      draft.auth.isLoading = false;
    });
    history.push("/auth");
  };

  const tryToLoginCurrentUser = () => {
    firebaseAuth.onAuthStateChanged(createdUser => {
      if (createdUser) {
        loginCreatedUser({ createdUser });
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
      const updatedUserProfile = await createdUser.user.updateProfile({
        displayName: username,
        photoURL: `http://gravatar.com/avatar/${md5(
          createdUser.user.email
        )}?d=identicon`
      });
      const saveUserToFirestore = await createUserDocument(createdUser.user);
      console.log("user saved");
      // const saveUserToState = loginCreatedUser({ createdUser });
      setState(draft => {
        draft.auth.currentUser = createdUser;
        draft.auth.isLoading = false;
      });
      history.push("/");
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
      loginCreatedUser({ currentUser });
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

  const createUserDocument = async (user, additionalData) => {
    // If there is no user, let's not do this.
    if (!user) return;

    // Get a reference to the location in the Firestore where the user
    // document may or may not exist.
    const userRef = firestore.doc(`users/${user.uid}`);

    // Go and fetch a document from that location.
    const snapshot = await userRef.get();

    // If there isn't a document for that user. Let's use information
    // that we got from either Google or our sign up form.
    if (!snapshot.exists) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user", console.error);
      }
    }

    // Get the document and return it, since that's what we're
    // likely to want to do next.
    return getUserDocument(user.uid);
  };

  const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firestore
        .collection("users")
        .doc(uid)
        .get();

      return { uid, ...userDocument.data() };
    } catch (error) {
      console.error("Error fetching user", error.message);
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
