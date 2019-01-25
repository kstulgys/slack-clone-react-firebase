import React, { useEffect } from 'react';
import { Comment, Segment, Input, Progress } from 'semantic-ui-react';
import Message from './Message';
import useMessage from '../../store/Message';
import useChannel from '../../store/Channel';

export default function MessagesWindow() {
  const [message, { sendMessage, subscribeToNewMessages }] = useMessage();
  const [channel] = useChannel();

  useEffect(
    () => {
      subscribeToNewMessages();
      // return () => subscribeToNewMessages();
    },
    [channel.currentChannel]
  );
  // console.log(message.messages);

  const displayMessages = messages => {
    console.log('in displayMessages with', messages);

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
          height: '62vh',
          overflowY: 'scroll'
        }}>
        {
          //  {this.displayMessageSkeleton(messagesLoading)}
          //       {searchTerm
          //         ? this.displayMessages(searchResults)
          //         : this.displayMessages(messages)}
          //       {this.displayTypingUsers(typingUsers)}
          //       <div ref={node => (this.messagesEnd = node)} />
        }
        {message.messages && displayMessages(message.messages)}
        {message.uploadingFile && (
          <Progress percent={message.percentUploaded} indicating />
        )}
      </Comment.Group>
    </Segment>
  );
}
