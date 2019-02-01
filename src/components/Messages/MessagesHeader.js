import React, { useState, useEffect } from 'react';
import { Header, Segment, Input, Icon } from 'semantic-ui-react';
import useChannel from '../../store/Channel';

export default function MessagesHeader() {
  const [channel, { setSearchResults }] = useChannel();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLoader, setSearchLoader] = useState(false);

  const handleSearchLoader = () => {
    setSearchLoader(true);
    setTimeout(() => {
      setSearchLoader(false);
    }, 500);
  };

  useEffect(
    () => {
      setSearchResults(searchTerm);
      handleSearchLoader();
    },
    [searchTerm]
  );

  return (
    <Segment clearing>
      {/* Channel Title */}
      <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
          # {channel.currentChannel && channel.currentChannel.channelName}
          <Icon
            // onClick={handleStar}
            name="star outline"
            color="yellow"
          />
        </span>
        <Header.Subheader>{channel.uniqueUsers}</Header.Subheader>
      </Header>

      {/* Channel Search Input */}
      <Header floated="right">
        <Input
          loading={searchLoader}
          onChange={e => setSearchTerm(e.target.value)}
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="Search Messages"
        />
      </Header>
    </Segment>
  );
}
