import React, { useState } from "react";
import { Button, Segment, Input, Icon } from "semantic-ui-react";
import useMessage from "../../store/Message";

export default function MessagesForm() {
  const { sendMessage } = useMessage();
  const [message, setMessage] = useState("");
  // console.log(message);
  // console.log(typeof message);

  return (
    <Segment
      style={{
        position: "fixed ",
        bottom: "1em",
        marginLeft: "320px ",
        left: 0,
        right: "1em",
        zIndex: 200
      }}
    >
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
        // onKeyDown={this.handleKeyDown}
        // value={message}
        // ref={node => (this.messageInputRef = node)}
        // style={{ marginBottom: "0.7em" }}
        label={
          <Button
            icon={"add"}
            content={null}
            // onClick={this.handleTogglePicker}
          />
        }
        labelPosition="left"
        // className={
        //   errors.some(error => error.message.includes("message")) ? "error" : ""
        // }
        placeholder="Write your message"
      />
      <Button.Group icon widths="2">
        <Button
          onClick={() => sendMessage({ message })}
          // disabled={loading}
          color="orange"
          content="Add Reply"
          labelPosition="left"
          icon="edit"
        />
        <Button
          color="teal"
          // disabled={uploadState === "uploading"}
          // onClick={this.openModal}
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
        />
      </Button.Group>
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
