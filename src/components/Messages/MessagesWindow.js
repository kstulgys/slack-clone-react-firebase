import React from "react";
import { Comment, Segment, Input, Icon } from "semantic-ui-react";

export default function MessagesWindow() {
  return (
    <Segment>
      <Comment.Group
        style={{
          height: "62vh",
          overflowY: "scroll"
        }}
      >
        {
          //  {this.displayMessageSkeleton(messagesLoading)}
          //       {searchTerm
          //         ? this.displayMessages(searchResults)
          //         : this.displayMessages(messages)}
          //       {this.displayTypingUsers(typingUsers)}
          //       <div ref={node => (this.messagesEnd = node)} />
        }
      </Comment.Group>
    </Segment>
  );
}
