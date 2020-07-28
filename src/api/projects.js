import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/projects';

export const fetchProjectsApi = async (config) => {
  const resp = await axios.get(`${baseUrl}`, config);

  return resp;
}

export const addProjectApi = async (values, config) => {
  const resp = await axios.post(`${baseUrl}`, values, config);

  return resp;
}

export const deleteProjectApi = async (selectedProject, config) => {
  const resp = await axios.delete(`${baseUrl}/${selectedProject.p_id}`, config);

  return resp;
}

export const editProjectApi = async (editedProject, config) => {
  const resp = await axios.put(`${baseUrl}/${editedProject.p_id}`, editedProject, config);

  return resp;
}