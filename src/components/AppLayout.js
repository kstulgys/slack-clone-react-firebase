import React from "react";
import useAuth from "../store/Auth";
import {
  Button,
  Checkbox,
  Menu,
  Grid,
  Dimmer,
  Loader
} from "semantic-ui-react";

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
      <Grid.Column>
        <div>Color Panel</div>
      </Grid.Column>

      <Grid.Column>
        <Menu
          size="large"
          vertical
          inverted
          fixed="left"
          style={{ background: "#4c3c4c" }}
        />
      </Grid.Column>

      <Grid.Column width={8}>
        <div>Messages</div>
      </Grid.Column>

      <Grid.Column width={4}>
        <div onClick={logout}>Meta Panel</div>
      </Grid.Column>
    </Grid>
  );
}
