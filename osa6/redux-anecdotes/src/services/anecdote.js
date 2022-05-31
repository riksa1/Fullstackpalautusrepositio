import axios from "axios";
import { getId } from "../reducers/anecdoteReducer";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content: content, votes: 0, id: getId() };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const voteAnecdote = async (anecdote) => {
  await axios.put(`${baseUrl}/${anecdote.id}`, {
    ...anecdote,
    votes: anecdote.votes + 1,
  });
};

const services = {
  getAll,
  createNew,
  voteAnecdote,
};

export default services;
