import Store from "./index";
import { firebaseAuth, firestore } from "./firebase";
import md5 from "md5";

// const waait = async (sec = 500) =>
//   new Promise(resolve => setTimeout(resolve, sec));

export const initialState = {
  currentChannel: null,
  isPrivateChannel: false,
  userPosts: null,
  channels: []
};

export default function useChannel() {
  const [{ auth, channel }, setState, history] = Store.useStore();

  const createChannel = async ({ channelName, channelDetails }) => {
    const newChannel = {
      channelName,
      channelDetails,
      createdBy: {
        name: auth.currentUser.displayName,
        avatar: auth.currentUser.photoURL
      }
    };
    try {
      const docRef = await firestore.collection("channels").add(newChannel);
      console.log("new channel added");
    } catch (e) {
      console.log("e.message from channel", e.message);
    }
    // const doc = await docRef.get();

    // const newPost = {
    //   id: doc.id,
    //   ...doc.data()
    // };

    // const { posts } = this.state;
    // this.setState({ posts: [newPost, ...posts] });
  };

  const subscribeToChannels = () => {
    firestore.collection("channels").onSnapshot(snapshot => {
      const channels = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setState(draft => {
        draft.channel.channels = channels;
        draft.channel.currentChannel = channels[0];
      });
      // console.log(channel.currentChannel);
    });
  };

  const changeChannel = channel => {
    setState(draft => {
      draft.channel.currentChannel = channel;
    });
  };

  // const setFirstChannelOnMount = channel => {
  //   setState(draft => {
  //     draft.channel.firstChannel = channel;
  //   });
  // };

  return [
    channel,
    {
      createChannel,
      subscribeToChannels,
      changeChannel
    }
  ];
}
