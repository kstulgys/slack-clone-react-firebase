import React from "react";
import useAuth from "../store/Auth";
import { Button, Checkbox, Form, Grid } from "semantic-ui-react";

export default function AuthUserForm() {
  const [auth, { login }] = useAuth();

  return (
    <Grid
      centered
      container
      stretched
      verticalAlign="middle"
      style={{ height: "80vh" }}
    >
      <Grid.Column width={7}>
        <Form>
          <Form.Field>
            <label>First Name</label>
            <input placeholder="First Name" disabled={auth.isLoading} />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder="Last Name" disabled={auth.isLoading} />
          </Form.Field>
          <Form.Field>
            <Checkbox label="I agree to the Terms and Conditions" />
          </Form.Field>
          <Button
            fluid
            inverted
            color="violet"
            // color={"#4c3c4c"}
            type="submit"
            onClick={login}
            loading={auth.isLoading}
          >
            Submit
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
}
