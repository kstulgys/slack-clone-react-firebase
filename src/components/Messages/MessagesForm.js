import React, { useState, useEffect } from 'react';
import { Button, Segment, Input, Popup, Label } from 'semantic-ui-react';
import FileModal from './FileModal';
import useChannel from '../../store/Channel';

export default function MessagesForm() {
  // const [message, { sendMessage, subscribeToNewMessages }] = useMessage();
  const [channel, { sendMessage }] = useChannel();
  const [content, setMessage] = useState('');

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      sendMessage(content);
      setMessage('');
    }

    // const { message, typingRef, channel, user } = this.state;

    // if (message) {
    //   typingRef
    //     .child(channel.id)
    //     .child(user.uid)
    //     .set(user.displayName);
    // } else {
    //   typingRef
    //     .child(channel.id)
    //     .child(user.uid)
    //     .remove();
    // }
  };

  return (
    <Segment
      style={{
        position: 'fixed ',
        bottom: '1em',
        marginLeft: '335px ',
        left: 0,
        right: '1em',
        zIndex: 200
      }}>
      {
        // {emojiPicker && (
        //   <Picker
        //     set="apple"
        //     onSelect={this.handleAddEmoji}
        //     className="emojipicker"
        //     title="Pick your emoji"
        //     emoji="point_up"
        //   />
        // )}
      }
      <Input
        fluid
        name="message"
        onChange={e => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        value={content}
        labelPosition="left"
        placeholder="Write your message"
        type="text"
        // className={
        //   errors.some(error => error.message.includes("message")) ? "error" : ""
        // }
      >
        <Label icon={'add'} />

        <input />
        <FileModal />
      </Input>

      {
        // <FileModal
        //   modal={modal}
        //   closeModal={this.closeModal}
        //   uploadFile={this.uploadFile}
        // />
        // <ProgressBar
        //   uploadState={uploadState}
        //   percentUploaded={percentUploaded}
        // />
      }
    </Segment>
  );
}
