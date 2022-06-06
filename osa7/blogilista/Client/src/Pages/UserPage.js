import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userService from "../services/users";
import { Typography } from "@mui/material";

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const result = await userService.getUser(id);
      setUser(result[0]);
    };
    getUser();
  }, [id]);

  if (user === null) {
    return null;
  }

  return (
    <div style={{ marginTop: 10 }}>
      <Typography variant="h4">{user.name}</Typography>
      <Typography variant="h6">added blogs</Typography>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Typography>{blog.title}</Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
