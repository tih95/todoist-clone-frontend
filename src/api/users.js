import axios from 'axios';

const baseUrl = 'https://boiling-dawn-63574.herokuapp.com/api/users';

export const loginUserApi = async (user) => {
  console.log('inside login user api')
  const resp = await axios.post(`${baseUrl}/login`, user);
  console.log('resp', resp);
  return resp;
}

export const registerUserApi = async (user) => {
  const resp = await axios.post(`${baseUrl}/register`, user);

  return resp;
}