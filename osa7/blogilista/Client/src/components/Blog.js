import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";

const Blog = ({ blog, username, removeBlog, likeBlog }) => {
  const [show, setShow] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
  };

  const paragraphStyle = {
    margin: 0,
  };

  return (
    <div>
      {show ? (
        <div style={blogStyle} className="blog">
          <Typography variant="h5" style={paragraphStyle}>
            {blog.title} <button onClick={() => setShow(!show)}>hide</button>
          </Typography>
          <Typography variant="h5" style={paragraphStyle} id="url">
            {blog.url}
          </Typography>
          <Typography variant="h5" style={paragraphStyle} id="likes">
            {`likes ${blog.likes} `}
            <button onClick={() => likeBlog(blog)}>like</button>
          </Typography>
          <Typography variant="h5" style={paragraphStyle}>
            {blog.author}
          </Typography>
          {username === blog.user.username ? (
            <button
              style={{ backgroundColor: "blue" }}
              onClick={() => removeBlog(blog)}
            >
              remove
            </button>
          ) : null}
        </div>
      ) : (
        <Box style={blogStyle} className="blog">
          <Typography variant="h7" style={paragraphStyle} id="text">
            <Link to={`${blog.id}`}>
              {blog.title} {blog.author}{" "}
            </Link>
          </Typography>
        </Box>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array,
  setBlogs: PropTypes.func,
  username: PropTypes.string,
  removeBlog: PropTypes.func,
  likeBlog: PropTypes.func,
};

export default Blog;
