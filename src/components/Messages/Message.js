import React from 'react';
import { distanceInWordsToNow } from 'date-fns';
import { Comment, Image, Progress } from 'semantic-ui-react';
import useAuth from '../../store/Auth';
import useMessage from '../../store/Message';
import isUrl from 'is-url';

export default function Message(props) {
  const [message] = useMessage();
  const [auth] = useAuth();
  const isOwnMessage =
    auth.currentUser.uid == props.user.id
      ? {
          borderLeft: '2px solid orange',
          paddingLeft: 8
        }
      : '';
  // console.log(message.uploadingFile, message.percentUploaded);

  return (
    <Comment>
      <Comment.Avatar src={props.user.photoURL} />
      <Comment.Content style={{ isOwnMessage }}>
        <Comment.Author as="a">{props.user.name}</Comment.Author>
        <Comment.Metadata>
          {distanceInWordsToNow(props.message.createdAt.toDate())} ago
        </Comment.Metadata>

        {isUrl(props.message.content) ? (
          <Image src={props.message.content} className="message__image" />
        ) : (
          <Comment.Text>{props.message.content}</Comment.Text>
        )}
      </Comment.Content>
    </Comment>
  );
}
