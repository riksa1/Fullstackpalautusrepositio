import React from "react";
import Notification from "../components/Notification";
import { useSelector } from "react-redux";
import { Typography, TextField, Button } from "@mui/material";

const LoginPage = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  const { successMessage, errorMessage } = useSelector(
    (state) => state.notification
  );
  return (
    <>
      <Typography variant="h4" style={{ marginBottom: 10 }}>
        Login to application
      </Typography>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            type="text"
            value={username}
            name="Username"
            label="Username"
            onChange={({ target }) => setUsername(target.value)}
            id="Username"
            style={{ marginBottom: 10 }}
            fullWidth
          />
        </div>
        <div>
          <TextField
            type="password"
            value={password}
            name="Password"
            label="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="Password"
            style={{ marginBottom: 10 }}
            fullWidth
          />
        </div>
        <Button id="Login" type="submit" variant="contained" fullWidth>
          login
        </Button>
      </form>
    </>
  );
};

export default LoginPage;
