import React from "react";
import useAuth from "../store/Auth";

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
import SidePanel from "./SidePanel";

export default function AppLayout() {
  const [auth, { logout }] = useAuth();

  if (auth.isLoading)
    return (
      <Dimmer active>
        <Loader size="massive">Loading</Loader>
      </Dimmer>
    );
  return (
    <Grid columns="equal" style={{ background: "#eee", height: "100%" }}>
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
          color="blue"
          // onClick={this.openModal}
        />
      </Sidebar>

      <SidePanel />

      <Grid.Column>
        <div>Messages</div>
      </Grid.Column>

      <Grid.Column width={4}>
        <div onClick={logout}>Meta Panel</div>
      </Grid.Column>
    </Grid>
  );
}
