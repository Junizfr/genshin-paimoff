import api from '../functions/api.js';

export const allUsers = async () => {
  const datas = await api.get('http://localhost:3000/users');
  return datas;
};
export const oneUser = async (id) => {
  const data = await api.get(`http://localhost:3000/users/${id}`);
  return data;
};
