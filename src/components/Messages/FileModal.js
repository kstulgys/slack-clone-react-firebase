import React, { useState } from 'react';
import mime from 'mime-types';
import { Modal, Input, Button, Icon, Label, Popup } from 'semantic-ui-react';
import useChannel from '../../store/Channel';

export default function FileModal() {
  const [
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
  ] = useChannel();

  const [fileState, setFile] = useState({
    file: null,
    authorized: ['image/jpeg', 'image/png']
  });
  // const [isModalOpen, setModal] = useState(false);

  const isAuthorized = filename =>
    fileState.authorized.includes(mime.lookup(filename));

  const clearFile = () => setFile({ ...fileState, file: null });

  const addFile = event => {
    const file = event.target.files[0];
    if (file) {
      setFile({ ...fileState, file });
    }
  };

  const sendFile = () => {
    const { file } = fileState;
    if (file !== null && isAuthorized(file.name)) {
      const metadata = { contentType: mime.lookup(file.name) };
      uploadFile(file, metadata);
      clearFile();
    }
  };

  const truncate = str =>
    str.length > 15 ? str.substring(0, 15) + '...' : str;

  return (
    <Popup
      trigger={<Button color="brown" icon="cloud upload" />}
      content={
        <>
          <label as="a" for="file">
            {fileState.file ? truncate(fileState.file.name) : 'Select file'}
          </label>
          <Input
            onChange={addFile}
            style={{ display: 'none' }}
            id="file"
            color="green"
            type="file"
            name="file"
            content="hi"
          />
          {fileState.file && (
            <>
              {' '}
              <Icon
                name="send"
                link
                onClick={sendFile}
                color="brown"
                size="large"
              />{' '}
              <Icon
                name="cancel"
                link
                color="red"
                size="large"
                onClick={() => clearFile()}
              />
            </>
          )}
        </>
      }
      flowing
      hoverable={!fileState.file && true}
      position="top left"
      on={fileState.file !== null}
    />
    // <Modal
    //   trigger={
    //     <Label
    //       as="a"
    //       color="brown"
    //       // disabled={uploadState === "uploading"}
    //       onClick={() => setModal(isModalOpen => !isModalOpen)}
    //       icon="cloud upload"
    //     />
    //   }
    //   basic
    //   open={isModalOpen}
    //   onClose={() => setModal(isModalOpen => !isModalOpen)}>
    //   <Modal.Header>Select an Image File</Modal.Header>
    //   <Modal.Content>
    //     <Input
    //       onChange={addFile}
    //       fluid
    //       label="File types: jpg, png"
    //       name="file"
    //       type="file"
    //     />
    //   </Modal.Content>
    //   <Modal.Actions>
    //     <Button onClick={sendFile} color="green" inverted>
    //       <Icon name="checkmark" /> Send
    //     </Button>
    //     <Button
    //       color="red"
    //       inverted
    //       onClick={() => setModal(isModalOpen => !isModalOpen)}>
    //       <Icon name="remove" /> Cancel
    //     </Button>
    //   </Modal.Actions>
    // </Modal>
  );
}
