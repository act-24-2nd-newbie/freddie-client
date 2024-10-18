import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1/tasks';

export const getTasks = async (email: string) => {
  const result = await axios.get(baseUrl + `?email=${email}`);
  return result.data;
};

export const createTask = async (taskCreateRequest: TaskCreateRequest) => {
  const result = await axios.post(baseUrl, taskCreateRequest);
  return result.data;
};

export const updateTask = async ({ id, ...request }: TaskUpdateRequest) => {
  const result = await axios.put(baseUrl + `/${id}`, request);
  return result.data;
};

export const deleteTask = async (id: number) => {
  const result = await axios.delete(baseUrl + `/${id}`);
  return result.data;
};

export const deleteAllTasks = async () => {
  const result = await axios.delete(baseUrl);
  return result.data;
};
