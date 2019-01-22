import React from "react";
import { Menu } from "semantic-ui-react";

import UserPanel from "./UserPanel";
// import Channels from "./Channels";
// import DirectMessages from "./DirectMessages";
// import Starred from "./Starred";

export default function SidePanel() {
  // const { currentUser, primaryColor } = this.props;

  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      // style={{ background: primaryColor, fontSize: "1.2rem" }}
      style={{ background: "#4c3e4c" }}
    >
      <UserPanel />
      {/*<Starred  />
        <Channels  />
        <DirectMessages />*/}
    </Menu>
  );
}
