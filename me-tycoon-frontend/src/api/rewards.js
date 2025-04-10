import axios from './axiosConfig';

export const getRewards = async () => {
  const res = await axios.get('/rewards/');
  return res.data;
};

export const buyReward = async (id) => {
  const res = await axios.post('/user-rewards/', { reward: id });
  return res.data;
};

export const getUserRewards = async () => {
  const res = await axios.get('/user-rewards/');
  return res.data;
};

export const useReward = async (id) => {
  await axios.delete(`/user-rewards/${id}/`);
};