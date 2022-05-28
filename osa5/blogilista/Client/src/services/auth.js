import axios from 'axios'
const baseUrl = 'http://localhost:3003/login' // /api/blogs

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }