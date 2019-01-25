import React, { useState } from 'react';
import mime from 'mime-types';
import { Modal, Input, Button, Icon, Label } from 'semantic-ui-react';
import useMessage from '../../store/Message';

export default function FileModal() {
  const [message, { uploadFile }] = useMessage();

  const [fileState, setFile] = useState({
    file: null,
    authorized: ['image/jpeg', 'image/png']
  });
  const [isModalOpen, setModal] = useState(false);

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
      setModal(isModalOpen => !isModalOpen);
      clearFile();
    }
  };

  return (
    <Modal
      trigger={
        <Label
          as="a"
          color="teal"
          // disabled={uploadState === "uploading"}
          onClick={() => setModal(isModalOpen => !isModalOpen)}
          icon="cloud upload"
        />
      }
      basic
      open={isModalOpen}
      onClose={() => setModal(isModalOpen => !isModalOpen)}>
      <Modal.Header>Select an Image File</Modal.Header>
      <Modal.Content>
        <Input
          onChange={addFile}
          fluid
          label="File types: jpg, png"
          name="file"
          type="file"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={sendFile} color="green" inverted>
          <Icon name="checkmark" /> Send
        </Button>
        <Button
          color="red"
          inverted
          onClick={() => setModal(isModalOpen => !isModalOpen)}>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
