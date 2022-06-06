import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs"; // /api/blogs

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return request.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request.data;
};

const createComment = async (comment, id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment: comment },
    config
  );
  return request.data;
};

export default {
  setToken,
  getAll,
  create,
  update,
  remove,
  getBlog,
  createComment,
};
