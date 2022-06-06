import React, { useState, useEffect } from "react";
import blogService from "../services/blogs";
import { useParams } from "react-router-dom";
import { Typography, Button, TextField } from "@mui/material";

const BlogPage = ({ likeBlog }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const getBlog = async () => {
      const result = await blogService.getBlog(id);
      setBlog(result[0]);
    };
    getBlog();
  }, [id]);

  const addComment = async () => {
    const newComment = await blogService.createComment(comment, blog.id);
    setBlog({ ...blog, comments: [...blog.comments, newComment] });
  };

  if (blog === null) {
    return null;
  }

  return (
    <>
      <Typography variant="h4">{blog.title}</Typography>
      <ul>
        <li>
          <Typography>{blog.url}</Typography>
        </li>
        <li>
          <Typography> {blog.likes} likes</Typography>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              likeBlog(blog);
              setBlog({ ...blog, likes: blog.likes + 1 });
            }}
          >
            like
          </Button>
        </li>
        <li>
          <Typography>{`added by ${blog.user.name}`}</Typography>
        </li>
      </ul>
      <Typography variant="h5">Comments</Typography>
      <TextField
        onChange={(event) => setComment(event.target.value)}
        value={comment}
        variant="outlined"
        size="small"
      />{" "}
      <Button variant="contained" onClick={() => addComment()}>
        add comment
      </Button>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>
            <Typography>{comment.comment}</Typography>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogPage;
