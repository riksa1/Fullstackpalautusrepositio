import React from "react";
import { useSelector } from "react-redux";
import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";

const BlogsPage = ({ likeBlog, removeBlog, addNewBlog }) => {
  const { blogs } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      <br />
      <Togglable buttonLabel="create new">
        <BlogForm addNewBlog={addNewBlog} />
      </Togglable>{" "}
      <br />
      <br />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          username={user.username}
          removeBlog={removeBlog}
          likeBlog={likeBlog}
        />
      ))}
    </div>
  );
};

export default BlogsPage;
