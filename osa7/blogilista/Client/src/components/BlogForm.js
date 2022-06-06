import React, { useState } from "react";
import Input from "./Input";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const BlogForm = ({ addNewBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const blogCreation = (event) => {
    event.preventDefault();

    addNewBlog(newBlog);

    setNewBlog({ title: "", author: "", url: "" });
  };

  const handleTitleChange = (event) => {
    setNewBlog({ ...newBlog, title: event.target.value });
  };

  const handleAuthorChange = (event) => {
    setNewBlog({ ...newBlog, author: event.target.value });
  };

  const handleUrlChange = (event) => {
    setNewBlog({ ...newBlog, url: event.target.value });
  };

  return (
    <form onSubmit={blogCreation}>
      <Input
        name="title"
        newValue={newBlog.title}
        handleValueChange={handleTitleChange}
        placeHolder="Title"
        id="Title"
      />
      <Input
        name="author"
        newValue={newBlog.author}
        handleValueChange={handleAuthorChange}
        placeHolder="Author"
        id="Author"
      />
      <Input
        name="url"
        newValue={newBlog.url}
        handleValueChange={handleUrlChange}
        placeHolder="Url"
        id="Url"
      />
      <br />
      <div>
        <Button variant="contained" id="Newblogbutton" type="submit">
          create
        </Button>
      </div>
    </form>
  );
};

BlogForm.propTypes = {
  addNewBlog: PropTypes.func.isRequired,
};

export default BlogForm;
