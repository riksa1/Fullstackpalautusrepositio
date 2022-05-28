const listHelper = require("../utils/list_helper");

describe("person with the most likes", () => {
  test("with no blogs", () => {
    const blogs = [];

    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({});
  });

  test("with only one blog", () => {
    const blogs = [
      { title: "Hello", author: "Riko", url: "https://google.com", likes: 69 },
    ];

    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ author: "Riko", likes: 69 });
  });

  test("with multiple blogs all same author", () => {
    const blogs = [
      { title: "Hello", author: "Riko", url: "https://google.com", likes: 22 },
      { title: "Hello2", author: "Riko", url: "https://google.com", likes: 5 },
      { title: "Hello3", author: "Riko", url: "https://google.com", likes: 21 },
    ];

    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ author: "Riko", likes: 48 });
  });

  test("with multiple blogs and all different authors", () => {
    const blogs = [
      { title: "Hello", author: "Riko", url: "https://google.com", likes: 22 },
      { title: "Hello2", author: "Riko2", url: "https://google.com", likes: 5 },
      {
        title: "Hello3",
        author: "Riko3",
        url: "https://google.com",
        likes: 22,
      },
    ];

    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Riko",
      likes: 22,
    });
  });

  test("with multiple blogs and some different authors", () => {
    const blogs = [
      { title: "Hello", author: "Riko", url: "https://google.com", likes: 22 },
      { title: "Hello2", author: "Riko2", url: "https://google.com", likes: 5 },
      {
        title: "Hello3",
        author: "Riko2",
        likes: 5,
      },
    ];

    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Riko",
      likes: 22,
    });
  });

  test("with many blogs and many different authors", () => {
    const blogs = [
      { title: "Hello", author: "Riko", url: "https://google.com", likes: 22 },
      { title: "Hello2", author: "Riko2", url: "https://google.com", likes: 5 },
      {
        title: "Hello3",
        author: "Riko2",
        likes: 5,
      },
      {
        title: "Hello3",
        author: "Riko3",
        likes: 34,
      },
      {
        title: "Hello3",
        author: "Riko3",
        likes: 5,
      },
      {
        title: "Hello3",
        author: "Riko4",
        likes: 44,
      },
      {
        title: "Hello3",
        author: "Riko2",
        likes: 5,
      },
    ];

    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Riko4",
      likes: 44,
    });
  });
});
