import Store from './index';
import { firebaseAuth, firestore, storage } from './firebase';
import md5 from 'md5';
import uuidv4 from 'uuid/v4';
import isUrl from 'is-url';

export const initialState = {
  currentChannel: null,
  isPrivateChannel: false,
  userPosts: null,
  channels: [],
  messages: [],
  percentUploaded: 0,
  uploadingFile: false,
  uniqueUsers: 0,
  searchResults: [],
  users: []
};

export default function useChannel() {
  const [{ auth, channel }, setState] = Store.useStore();

  const publicChannelRef = firestore.doc(
    `/channels/${channel.currentChannel && channel.currentChannel.id}`
  );
  const messagesRef = publicChannelRef.collection('messages');
  // console.log(messagesRef);
  const createChannel = async ({ channelName, channelDetails = '' }) => {
    const publicChannel = {
      createdAt: new Date(),
      channelName,
      channelDetails,
      createdBy: {
        name: auth.currentUser.displayName,
        avatar: auth.currentUser.photoURL
      }
    };

    try {
      const docRef = await firestore.collection('channels').add(publicChannel);
      console.warn('New channel added');
      const channel = await docRef.get().then(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      changeChannel(channel);
    } catch (e) {
      console.error('e.message from channel', e.message);
    }
  };

  const subscribeToChannels = () => {
    // if (channel.currentChannel) {
    firestore
      .collection('channels')
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        const channels = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // console.log(channels);
        setState(draft => {
          draft.channel.channels = channels;
          draft.channel.currentChannel = channels[0];
        });
      });
    // }
  };
  const changeChannel = channel => {
    setState(draft => {
      draft.channel.currentChannel = channel;
    });
  };

  const sendMessage = async content => {
    const newMessage = {
      content,
      createdAt: new Date(),
      user: {
        id: auth.currentUser.uid,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL
      }
    };

    try {
      await messagesRef.add(newMessage);
      console.warn('new message has been sent');
    } catch (e) {
      console.error('Error creating message', e.message);
    }
  };

  const subscribeToMessages = () => {
    // console.log(channel.currentChannel);
    if (channel.currentChannel) {
      messagesRef.orderBy('createdAt', 'asc').onSnapshot(snapshot => {
        const messages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // const uniqueUsers = getUniqueUsers(messages);
        setState(draft => {
          draft.channel.messages = messages;
          draft.channel.uniqueUsers = getUniqueUsers(messages);
        });
      });
    }
  };

  const getUniqueUsers = messages => {
    const res = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    return `${res.length} ${res.length > 1 ? 'users' : 'user'}`;
  };

  const uploadFile = (file, metadata) => {
    const uploadTask = storage
      .ref()
      .child(`chat/public/${uuidv4()}.jpg`)
      .put(file, metadata);

    uploadTask.on('state_changed', snap => {
      const percentUploaded = Math.round(
        (snap.bytesTransferred / snap.totalBytes) * 100
      );
      setState(draft => {
        draft.channel.uploadingFile = true;
        draft.channel.percentUploaded = percentUploaded;
      });
    });

    uploadTask
      .then(response => response.ref.getDownloadURL())
      .then(content => {
        sendMessage(content);
        setState(draft => {
          draft.channel.uploadingFile = false;
          draft.channel.percentUploaded = 0;
        });
      });
  };

  const subscribeToUsers = () => {
    firestore.collection('users').onSnapshot(snapshot => {
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // console.log(messages);
      // const uniqueUsers = getUniqueUsers(messages);
      setState(draft => {
        draft.channel.users = users;
      });
    });
  };

  const setSearchResults = searchTerm => {
    // console.log(searchTerm);
    if (searchTerm === '') {
      setState(draft => {
        draft.channel.searchResults = [];
      });
    } else {
      const regexp = new RegExp(searchTerm, 'gi');
      const res = channel.messages.reduce((acc, message) => {
        if (
          message.content.match(regexp) ||
          message.user.displayName.match(regexp)
        ) {
          acc.push(message);
        }
        return acc;
      }, []);
      setState(draft => {
        draft.channel.searchResults = res;
      });
    }
  };

  return [
    channel,
    {
      createChannel,
      subscribeToChannels,
      changeChannel,
      sendMessage,
      subscribeToMessages,
      uploadFile,
      subscribeToUsers,
      setSearchResults
    }
  ];
}
