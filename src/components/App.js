import React from "react";
import useAuth from "../store/Auth";

export default function App() {
  const [auth, { logout }] = useAuth();

  return (
    <div className="App">
      <h1>Yello World!</h1>
      <button onClick={logout}>Log out</button>
      {auth.isLoading && <p>Loading user...</p>}
    </div>
  );
}
