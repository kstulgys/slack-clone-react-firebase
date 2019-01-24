import Store from "./index";
import { firebaseAuth, firestore } from "./firebase";
import md5 from "md5";

// export const initialState = {
//   currentChannel: null,
//   isPrivateChannel: false,
//   userPosts: null,
//   channels: []
// };

export default function useMessage() {
  const [{ auth, channel }, setState, history] = Store.useStore();

  const sendMessage = async ({ message }) => {
    const newMessage = {
      message,
      user: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL
      }
    };
    // firestore.doc(`messages/${channel.currentChannel.id}`).merge(newMessage);

    try {
      // firestore
      //   .collection("messages")
      //   .doc(`${channel.currentChannel.id}`)
      //   .add(newMessage);

      firestore
        .collection("messages")
        .doc(`${channel.currentChannel.id}`)
        .add(newMessage);

      //             .collection("messages")
      // .doc(`${channel.currentChannel.id}`)
      // .collection(`${channel.currentChannel.id}`)
      // .add(newMessage);
      // firestore
      //   .collection(`messages/${channel.currentChannel.id}`)
      //   .set(newMessage);
      // const messagerRef = firestore.doc(
      //   `messages/${channel.currentChannel.id}`
      // );
      // await messagerRef.set(newMessage);
      console.error("new message has been sent");
    } catch (e) {
      console.error("Error creating message", e.message);
    }
  };

  return { sendMessage };
}
