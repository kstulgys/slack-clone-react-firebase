import React from "react";
import {
  Dropdown,
  Header,
  Menu,
  Grid,
  Dimmer,
  Loader,
  Image,
  Segment
} from "semantic-ui-react";
import UserPanel from "./UserPanel";
import useAuth from "../../store/Auth";

import Channels from "./Channels";
// import DirectMessages from "./DirectMessages";
// import Starred from "./Starred";

export default function SidePanel() {
  const [auth, { logout }] = useAuth();

  // if (auth.isloading)
  //   return (
  //     <Segment>
  //       <Dimmer active inverted>
  //         <Loader size="large">Loading</Loader>
  //       </Dimmer>

  //       <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
  //     </Segment>
  //   );

  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      color="brown"
      // style={{ background: primaryColor, fontSize: "1.2rem" }}
      // style={{ background: "#4c3e4c" }}
    >
      <UserPanel />
      <Channels />
      {/*<Starred  />
        <DirectMessages />*/}
    </Menu>
  );
}
