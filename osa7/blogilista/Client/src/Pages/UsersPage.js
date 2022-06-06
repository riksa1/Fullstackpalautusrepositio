import React, { useEffect } from "react";
import { setUsers } from "../reducers/userReducer";
import userService from "../services/users";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const UserLine = ({ text, value, bold = false, userId = null }) => {
  return (
    <tr>
      <td>
        {" "}
        <Typography>
          <Link to={`${userId}`}>{text}</Link>
        </Typography>
      </td>
      <td style={bold ? { fontWeight: "bold" } : { fontWeight: "normal" }}>
        <Typography>{value}</Typography>
      </td>
    </tr>
  );
};

const UsersPage = () => {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      const users = await userService.getAll();
      dispatch(setUsers(users));
    };
    getUsers();
  }, []);

  return (
    <div>
      <Typography style={{ marginTop: 10 }} variant="h5">
        Users
      </Typography>
      <table>
        <tbody>
          <UserLine text="" value="blogs created" bold={true} />
          {users.map((user) => (
            <UserLine
              text={user.name}
              value={user.blogs.length}
              key={user.id}
              userId={user.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
