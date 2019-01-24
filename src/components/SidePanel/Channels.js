import React, { useState, useEffect } from "react";
import { Icon, Menu, Modal, Form, Button, Input } from "semantic-ui-react";
import useAuth from "../../store/Auth";
import useChannel from "../../store/Channel";

export default function Chanels() {
  const [auth, { logout }] = useAuth();
  const [
    channel,
    { createChannel, subscribeToChannels, changeChannel }
  ] = useChannel();
  const [modal, setModal] = useState(false);
  const [channelInfo, setChannelInfo] = useState({
    channelName: "",
    channelDetails: ""
  });

  const [activeChannel, setActiveChannel] = useState({});

  console.log(channel);
  // console.log(channel.currentChannel && channel.currentChannel.id);

  const handleChanelInfo = e => {
    setChannelInfo({ ...channelInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    createChannel({ ...channelInfo });
  };

  useEffect(() => {
    subscribeToChannels();
    return () => subscribeToChannels();
    // setActiveChannel(channel.channels[0]);
  }, []);

  // console.log(channeInfo);
  const displayChannels = channels =>
    channels.length > 0 &&
    channels.map(chn => (
      <Menu.Item
        key={chn.id}
        onClick={() => changeChannel(chn)}
        name={chn.channelName}
        style={{ opacity: 0.7 }}
        active={chn.id === channel.currentChannel.id}
        // active={true}
      >
        {
          // {this.getNotificationCount(channel) && (
          //   <Label color="red">{this.getNotificationCount(channel)}</Label>
          // )}
        }
        # {chn.channelName}
      </Menu.Item>
    ));

  return (
    <>
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>{" "}
          ({channel.channels.length}){" "}
          <Icon name="add" onClick={() => setModal(modal => !modal)} />
        </Menu.Item>
        {displayChannels(channel.channels)}
      </Menu.Menu>

      {/* Add Channel Modal */}
      <Modal basic open={modal} onClose={() => setModal(modal => !modal)}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <Input
                fluid
                label="Name of Channel"
                name="channelName"
                onChange={handleChanelInfo}
              />
            </Form.Field>

            <Form.Field>
              <Input
                fluid
                label="About the Channel"
                name="channelDetails"
                onChange={handleChanelInfo}
              />
            </Form.Field>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button color="green" inverted onClick={handleSubmit}>
            <Icon name="checkmark" /> Add
          </Button>
          <Button
            color="red"
            inverted
            onClick={() => setModal(modal => !modal)}
          >
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
