import React from "react";
import useAuth from "../store/Auth";

export default function AuthUserForm() {
  const [auth, { login, logout }] = useAuth();
  return (
    <div className="App">
      <h1>Is logged in {auth.isLoggedIn.toString()}</h1>
      {auth.loading && <p>Loading user...</p>}
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
