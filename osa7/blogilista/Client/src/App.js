import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import authService from "./services/auth";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "./reducers/notificationReducer";
import {
  addBlog,
  setBlogs,
  removeBlogs,
  likeBlogs,
} from "./reducers/blogReducer";
import { Typography, Button, Grid } from "@mui/material";
import { setUser } from "./reducers/userReducer";
import LoginPage from "./Pages/LoginPage";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import BlogsPage from "./Pages/BlogsPage";
import UsersPage from "./Pages/UsersPage";
import UserPage from "./Pages/UserPage";
import BlogPage from "./Pages/BlogPage";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { successMessage, errorMessage, timeout, errorTimeout } = useSelector(
    (state) => state.notification
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await authService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(setMessage(error.response.data.error, 5, errorTimeout, "error"));
    }
  };

  const addNewBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog);
      dispatch(addBlog(createdBlog));
      dispatch(
        setMessage(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          5,
          timeout,
          "message"
        )
      );
    } catch (error) {
      dispatch(setMessage(error.response.data.error, 5, errorTimeout, "error"));
    }
  };

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);
      dispatch(removeBlogs(blog.id));
    }
  };

  const likeBlog = async (blog) => {
    const result = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });
    dispatch(likeBlogs(result.id));
  };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setUser(null));
  };

  useEffect(() => {
    const getBlogs = async () => {
      const newBlogs = await blogService.getAll();
      dispatch(setBlogs(newBlogs));
    };
    getBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <>
      {user ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <Typography variant="h4">Blogs</Typography>
            <Notification message={successMessage} type="success" />
            <Notification message={errorMessage} type="error" />
            <Typography>
              <Link to="/blogs">Blogs</Link>
              <Link to="/users" style={{ marginLeft: 10, marginRight: 5 }}>
                Users
              </Link>
              {`    ${user.name} logged in `}
              <Button variant="contained" onClick={logout}>
                logout
              </Button>
            </Typography>
            <Routes>
              <Route path="/" element={<Navigate to="/blogs" />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/:id" element={<UserPage />} />
              <Route
                path="/blogs"
                element={
                  <BlogsPage
                    likeBlog={likeBlog}
                    removeBlog={removeBlog}
                    addNewBlog={addNewBlog}
                  />
                }
              />
              <Route
                path="/blogs/:id"
                element={<BlogPage likeBlog={likeBlog} />}
              />
            </Routes>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <LoginPage
              handleLogin={handleLogin}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default App;
