import React from "react";
// import useAuth from "../store/Auth";

import {
  Divider,
  Sidebar,
  Menu,
  Grid,
  Dimmer,
  Loader,
  Button,
  Icon
} from "semantic-ui-react";

export default function ColorPanel() {
  // const [auth, { logout }] = useAuth();

  return (
    <Sidebar
      as={Menu}
      icon="labeled"
      inverted
      vertical
      visible
      width="very thin"
    >
      <Divider />
      <Button
        icon="add"
        size="small"
        color="brown"
        // onClick={this.openModal}
      />
    </Sidebar>
  );
}
