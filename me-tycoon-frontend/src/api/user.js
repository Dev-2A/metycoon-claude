import axios from './axiosConfig';

export const getUserStats = async () => {
  const res = await axios.get(`/stats/`);
  return res.data[0]; // 임시 고정 유저 기준
};

export const resetUserState = async () => {
  await axios.post(`/reset/`);
};