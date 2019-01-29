import React, { useEffect } from 'react';
import { Comment, Segment, Input, Progress } from 'semantic-ui-react';
import Message from './Message';
import useMessage from '../../store/Message';
import useChannel from '../../store/Channel';

export default function MessagesWindow() {
  const [message, { sendMessage, subscribeToNewMessages }] = useMessage();
  const [channel] = useChannel();
  // console.log(message.searchResults);
  useEffect(
    () => {
      subscribeToNewMessages();
      // return () => subscribeToNewMessages();
    },
    [channel.currentChannel]
  );
  console.log('message.messages', message.messages);
  console.log('message.searchResults', message.searchResults);

  const displayMessages = messages => {
    // console.log('in displayMessages with', messages);

    return (
      messages.length > 0 &&
      messages.map(message => (
        <Message key={message.id} message={message} user={message.user} />
      ))
    );
  };

  return (
    <Segment>
      <Comment.Group
        style={{
          height: `calc(100vh - 235px)`,
          overflowY: 'scroll'
        }}>
        {message.searchResults.length > 0
          ? displayMessages(message.searchResults)
          : displayMessages(message.messages)}
        {message.uploadingFile && (
          <Progress percent={message.percentUploaded} indicating />
        )}
      </Comment.Group>
    </Segment>
  );
}
