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
import Messages from "./Messages";
import ColorPanel from "./ColorPanel";

export default function AppLayout() {
  const [auth, { logout }] = useAuth();

  // console.log(auth.currentUser);
  if (auth.isloading || !auth.currentUser)
    return (
      <Dimmer active>
        <Loader size="massive">Loading</Loader>
      </Dimmer>
    );
  return (
    <Grid columns="equal" style={{ background: "#eee", height: "100%" }}>
      <ColorPanel />

      <SidePanel />

      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages />
      </Grid.Column>

      <Grid.Column width={4}>
        <div onClick={logout}>Meta Panel</div>
      </Grid.Column>
    </Grid>
  );
}
