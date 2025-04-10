import axios from './axiosConfig';

export const getQuestStats = async () => {
  const res = await axios.get('/quest-stats/');
  return res.data;
};

export const getQuestHistory = async () => {
  const res = await axios.get('/quest-history/');
  return res.data;
};

export const getMonthlyStats = async () => {
  const res = await axios.get('/monthly-stats');
  return res.data;
};

export const getQuestTypeStats = async () => {
  const res = await axios.get('/quest-type-stats/');
  return res.data;
};

export const getTopQuests = async () => {
  const res = await axios.get('/top-quests/');
  return res.data;
};

export const getBestExpDay = async () => {
  const res = await axios.get('/best-exp-day/');
  return res.data;
};

export const getBestCoinSpentDay = async () => {
  const res = await axios.get('/best-coin-day/');
  return res.data;
};

export const getSummaryStats = async () => {
  const res = await axios.get('/summary-stats/');
  return res.data;
};

export const getQuestHeatmapData = async () => {
  const res = await axios.get('/quest-heatmap/');
  return res.data;
}

export async function getQuestHistoryHeatmap() {
  try {
      const response = await axios.get("/quest-history-heatmap/");
      return response.data;
  } catch (error) {
      console.error("❌ 히트맵 데이터 불러오기 실패:", error);
      return [];
  }
}