import axios from 'axios';

const baseUrl = 'https://boiling-dawn-63574.herokuapp.com/api/users';
// const baseUrl = 'http://localhost:3001/api/users';

export const loginUserApi = async (user) => {
  const resp = await axios.post(`${baseUrl}/login`, user);

  return resp;
}

export const registerUserApi = async (user) => {
  const resp = await axios.post(`${baseUrl}/register`, user);

  return resp;
}

export const editUserApi = async (user, config) => {
  const resp = await axios.put(`${baseUrl}`, user, config);

  return resp;
}

export const updatePasswordApi = async (password, config) => {
  const resp = await axios.put(`${baseUrl}/password`, password, config);

  return resp;
}