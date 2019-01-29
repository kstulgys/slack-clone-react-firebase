import Store from './index';
import { firebaseAuth, firestore, storage } from './firebase';
import md5 from 'md5';
import uuidv4 from 'uuid/v4';
import isUrl from 'is-url';

export const initialState = {
  messages: [],
  percentUploaded: 0,
  uploadingFile: false,
  uniqueUsers: 0,
  searchResults: [],
  users: []
};

export default function useMessage() {
  const [{ auth, channel, message }, setState, history] = Store.useStore();

  const sendMessage = content => {
    const messagesRef = firestore.collection(
      `messages/${channel.currentChannel.id}/messages`
    );
    const newMessage = {
      content,
      createdAt: new Date(),
      user: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL
      }
    };

    try {
      messagesRef.add(newMessage);
      console.error('new message has been sent');
    } catch (e) {
      console.error('Error creating message', e.message);
    }
  };

  const subscribeToNewMessages = () => {
    if (channel.currentChannel) {
      firestore
        .collection('messages')
        .doc(`${channel.currentChannel.id}`)
        .collection('messages')
        .orderBy('createdAt', 'asc')
        .onSnapshot(snapshot => {
          const messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          // console.log(messages);
          // const uniqueUsers = getUniqueUsers(messages);
          setState(draft => {
            draft.message.messages = messages;
            draft.message.uniqueUsers = getUniqueUsers(messages);
          });
        });
    }
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
        draft.message.users = users;
      });
    });
  };

  const uploadFile = (file, metadata) => {
    const filePath = `chat/public/${uuidv4()}.jpg`;
    const uploadTask = storage
      .ref()
      .child(filePath)
      .put(file, metadata);

    uploadTask.on('state_changed', snap => {
      const percentUploaded = Math.round(
        (snap.bytesTransferred / snap.totalBytes) * 100
      );
      setState(draft => {
        draft.message.uploadingFile = true;
        draft.message.percentUploaded = percentUploaded;
      });
    });

    uploadTask
      .then(response => response.ref.getDownloadURL())
      .then(content => {
        sendMessage(content);
        setState(draft => {
          draft.message.uploadingFile = false;
          draft.message.percentUploaded = 0;
        });
      });
  };

  const getUniqueUsers = messages => {
    // console.log('messages from ubnique', messages);
    const res = messages.reduce((acc, message) => {
      // console.log('message from ubnique', message);

      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    return `${res.length} ${res.length > 1 ? 'users' : 'user'}`;
  };

  const setSearchResults = searchTerm => {
    // console.log(searchTerm);
    if (searchTerm === '') {
      setState(draft => {
        draft.message.searchResults = [];
      });
    } else {
      const regexp = new RegExp(searchTerm, 'gi');
      const res = message.messages.reduce((acc, message) => {
        if (message.content.match(regexp) || message.user.name.match(regexp)) {
          acc.push(message);
        }
        return acc;
      }, []);
      setState(draft => {
        draft.message.searchResults = res;
      });
    }
  };

  return [
    message,
    {
      sendMessage,
      subscribeToNewMessages,
      uploadFile,
      setSearchResults,
      subscribeToUsers
    }
  ];
}
