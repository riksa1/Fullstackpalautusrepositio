import axios from "axios";
const baseUrl = "/api/persons"; //https://fullstack-puhelinluettelo1.herokuapp.com/api/persons

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const delete_name = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  delete: delete_name,
};
