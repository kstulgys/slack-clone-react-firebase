import React, { useState } from 'react';
import useAuth from '../store/Auth';
import {
  Button,
  Message,
  Form,
  Grid,
  Header,
  Icon,
  Segment
} from 'semantic-ui-react';

export default function AuthUserForm() {
  const [auth, { login, signin }] = useAuth();
  const [isUser, setIsUser] = useState(false);
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });
  // console.log(auth.isLoading);
  const handleChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    const { email, password, username } = input;
    if (isUser) {
      login({ email, password });
    } else {
      signin({ email, password, username });
    }
  };

  return (
    <div style={{ background: '#eee', height: '100vh' }}>
      <Grid
        textAlign="center"
        verticalAlign="middle"
        style={{ height: '80vh' }}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="puzzle piece" color="violet" />
            {isUser ? `Login for DevChat` : `Register for DevChat`}
          </Header>
          <Form onSubmit={handleSubmit} size="large">
            {!isUser && (
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={handleChange}
                value={input.username}
                type="text"
              />
            )}

            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={handleChange}
              value={input.email}
              // className={this.handleInputError(errors, "email")}
              type="email"
            />

            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={handleChange}
              value={input.password}
              // className={this.handleInputError(errors, "password")}
              type="password"
            />
            {!isUser && (
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={handleChange}
                value={input.passwordConfirmation}
                // className={this.handleInputError(errors, "password")}
                type="password"
              />
            )}
            <Button
              disabled={auth.isLoading}
              loading={auth.isLoading}
              // className={loading ? "loading" : ""}
              color="violet"
              fluid
              size="large"

              // onClick={login}
            >
              Submit
            </Button>
          </Form>
          <br />

          <Header
            as="a"
            color="violet"
            size="small"
            onClick={() => setIsUser(!isUser)}
            content={isUser ? `Don't have an account yet?` : `Already a user?`}
          />
        </Grid.Column>
      </Grid>
    </div>
  );
}
// <Message>Already a user? {/*<Link to="/login">Login</Link>*/}</Message>
