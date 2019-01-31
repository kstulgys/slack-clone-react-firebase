import React, { Suspense } from 'react';
import { distanceInWordsToNow } from 'date-fns';
import { Comment, Image, Progress, Loader } from 'semantic-ui-react';
import useAuth from '../../store/Auth';
import useChannel from '../../store/Channel';
import isUrl from 'is-url';

import { unstable_createResource as createResource } from 'react-cache';

const imageResource = createResource(
  src =>
    new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(src);
      image.src = src;
    })
);

function Img(props) {
  return (
    <Suspense
      fallback={
        <Loader
        // type="Ball-Triangle"
        // color="#00BFFF"
        // height="90"
        // width="60"
        />
      }>
      <img {...props} src={imageResource.read(props.src)} />
    </Suspense>
  );
}

export default function Message(props) {
  const [auth] = useAuth();

  const isOwnMessage =
    auth.currentUser.uid == props.user.id
      ? {
          borderLeft: '2px solid orange',
          paddingLeft: 8
        }
      : '';

  return (
    <Comment>
      <Comment.Avatar src={props.user.photoURL} />
      <Comment.Content style={{ isOwnMessage }}>
        <Comment.Author as="a">{props.user.name}</Comment.Author>
        <Comment.Metadata>
          {distanceInWordsToNow(props.message.createdAt.toDate())} ago
        </Comment.Metadata>

        {isUrl(props.message.content) ? (
          <Image
            src={props.message.content}
            className="message__image"
            size="medium"
          />
        ) : (
          <Comment.Text>{props.message.content}</Comment.Text>
        )}
      </Comment.Content>
    </Comment>
  );
}

//<Img src={props.message.content} />
// <Image
//   src={props.message.content}
//   className="message__image"
//   size="medium"
// />
