import axios from './axiosConfig';

export const getUserAchievements = async () => {
  const res = await axios.get(`/user-achievements/`);
  return res.data;
};