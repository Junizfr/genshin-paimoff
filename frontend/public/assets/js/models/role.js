import api from '../functions/api.js';

export const all = async () => {
  const datas = await api.get('http://localhost:3000/roles');
  return datas;
};
export const one = async (id) => {
  const data = await api.get(`http://localhost:3000/roles/${id}`);
  return data;
};
