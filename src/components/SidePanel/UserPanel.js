import React from "react";
// import useAuth from "../store/Auth";
import {
  Dropdown,
  Header,
  Menu,
  Grid,
  Dimmer,
  Loader,
  Image,
  Icon
} from "semantic-ui-react";
import useAuth from "../../store/Auth";

// import SidePanel from "./SidePanel";

export default function UserPanel() {
  const [auth, { logout }] = useAuth();
  const dropdownOptions = [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>User name</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>
    },
    {
      key: "signout",
      text: <span onClick={logout}>Sign Out</span>
    }
  ];
  return (
    <Grid>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
          {/* App Header */}
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <Header.Content>DevChat</Header.Content>
          </Header>

          {/* User Dropdown  */}
          <Header style={{ padding: "0.25em" }} as="h4" inverted>
            <Dropdown
              trigger={
                <span>
                  <Image
                    src={
                      "https://api.adorable.io/avatars/285/abott@adorable.png"
                    }
                    spaced="right"
                    avatar
                  />
                  User name
                </span>
              }
              options={dropdownOptions}
            />
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
}
