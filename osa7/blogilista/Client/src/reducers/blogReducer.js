import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
  },
  reducers: {
    setBlogs(state, action) {
      const newBlogs = action.payload.sort((a, b) =>
        a.likes > b.likes ? -1 : 1
      );
      return {
        ...state,
        blogs: newBlogs,
      };
    },
    addBlog(state, action) {
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
      };
    },
    likeBlogs(state, action) {
      const newBlogs = state.blogs
        .map((blog) =>
          blog.id === action.payload ? { ...blog, likes: blog.likes + 1 } : blog
        )
        .sort((a, b) => (a.likes > b.likes ? -1 : 1));
      return {
        ...state,
        blogs: newBlogs,
      };
    },
    removeBlogs(state, action) {
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog.id !== action.payload),
      };
    },
  },
});

export const { setBlogs, addBlog, likeBlogs, removeBlogs } = blogSlice.actions;
export default blogSlice.reducer;
