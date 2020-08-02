import axios from 'axios';

const baseUrl = 'https://boiling-dawn-63574.herokuapp.com/api/todos';
//const baseUrl = 'http://localhost:3001/api/todos';

export const fetchTodosApi = async (config) => {
  const resp = await axios.get(`${baseUrl}`, config);
  return resp;
}

export const addTodoApi = async (todo, config) => {
  const resp = await axios.post(`${baseUrl}`, todo, config);
  return resp;
}

export const updateTodoApi = async (editedTodo, config) => {
  const resp = await axios.put(`${baseUrl}/${editedTodo.t_id}`, editedTodo, config);

  return resp;
}

export const deleteTodoApi = async (todo, config) => {
  const resp = await axios.delete(`${baseUrl}/${todo.t_id}`, config);
  return resp;
}

export const sortTodosApi = async (method, config) => {
  const resp = axios.get(`${baseUrl}/?sort=${method}`, config);
  return resp;
}