import React from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

export default function MessagesHeader() {
  // render() {
  // const {
  //   channelName,
  //   numUniqueUsers,
  //   handleSearchChange,
  //   searchLoading,
  //   isPrivateChannel,
  //   handleStar,
  //   isChannelStarred
  // } = this.props;

  return (
    <Segment clearing>
      {/* Channel Title */}
      <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
          Awesome channel
          <Icon
            // onClick={handleStar}
            name={"star"}
            color={"yellow"}
          />
        </span>
        <Header.Subheader>16 users</Header.Subheader>
      </Header>

      {/* Channel Search Input */}
      <Header floated="right">
        <Input
          // loading={searchLoading}
          // onChange={handleSearchChange}
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="Search Messages"
        />
      </Header>
    </Segment>
  );
}
