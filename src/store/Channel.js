import Store from './index';
import { firebaseAuth, firestore } from './firebase';
import md5 from 'md5';

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

  const createChannel = async ({
    channelName,
    channelDetails = '',
    isPrivate = false
  }) => {
    if (isPrivate) {
      setState(draft => {
        draft.channel.isPrivateChannel = true;
      });
    }

    const publicChannel = {
      channelName,
      channelDetails,
      createdBy: {
        name: auth.currentUser.displayName,
        avatar: auth.currentUser.photoURL
      }
    };
    const privateChannel = {
      channelName
    };

    const newChannel = isPrivate ? privateChannel : publicChannel;
    const channelRef = isPrivate
      ? firestore.collection('privateChannels')
      : firestore.collection('channels');

    try {
      const docRef = await channelRef.add(newChannel);
      console.log('new channel added');
      const channel = await docRef.get().then(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      changeChannel(channel);
      // console.log(channel);
    } catch (e) {
      console.log('e.message from channel', e.message);
    }
  };

  const subscribeToChannels = isPrivate => {
    const channelRef = isPrivate
      ? firestore.collection('privateChannels')
      : firestore.collection('channels');

    firestore.collection('channels').onSnapshot(snapshot => {
      // console.log(snapshot.docs);
      const channels = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setState(draft => {
        draft.channel.channels = channels;
        draft.channel.currentChannel = channels[0];
      });
    });
  };

  const changeChannel = channel => {
    setState(draft => {
      draft.channel.currentChannel = channel;
    });
  };

  return [
    channel,
    {
      createChannel,
      subscribeToChannels,
      changeChannel
    }
  ];
}
