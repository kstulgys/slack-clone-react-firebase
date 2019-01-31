import React, { useEffect, useRef } from 'react';
import { Comment, Segment, Input, Progress } from 'semantic-ui-react';
import Message from './Message';
import useChannel from '../../store/Channel';

export default function MessagesWindow() {
  // const scrollHeightRef = useRef(0);
  const scrollToBottomRef = useRef(0);
  const [channel, { subscribeToMessages }] = useChannel();

  // const divHeight = scrollHeightRef.current.scrollHeight;
  useEffect(() => {
    scrollToBottomRef.current.scrollIntoView();
  });

  useEffect(
    () => {
      subscribeToMessages();
      return subscribeToMessages();
    },
    [channel.currentChannel]
  );

  const displayMessages = messages => {
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
        {channel.searchResults.length > 0
          ? displayMessages(channel.searchResults)
          : displayMessages(channel.messages)}
        {channel.uploadingFile && (
          <Progress percent={channel.percentUploaded} indicating />
        )}
        <div ref={scrollToBottomRef} />
      </Comment.Group>
    </Segment>
  );
  // <p
  //   style={{
  //     position: 'absolute',
  //     // bottom: '1em',
  //     marginLeft: 10,
  //     left: 0,
  //     bottom: 10
  //     // right: '1em',
  //     // zIndex: 200
  //   }}>
  //   someone is typing ...
  // </p>
}
