import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/users';

export const loginUserApi = async (user) => {
  const resp = await axios.post(`${baseUrl}/login`, user);

  return resp;
}

export const registerUserApi = async (user) => {
  const resp = await axios.post(`${baseUrl}/register`, user);

  return resp;
}