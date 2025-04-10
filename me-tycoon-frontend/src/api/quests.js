import axios from './axiosConfig';

// ✅ 퀘스트 전체 목록 불러오기
export const getQuests = async () => {
  const response = await axios.get('/quests/');
  return response.data;
};

// ✅ 퀘스트 생성
export const createQuest = async (questData) => {
  const response = await axios.post('/quests/', questData);
  return response.data;
};

// ✅ 퀘스트 완료
export const completeQuest = async (questId) => {
  const response = await axios.post('/quest-completions/', { quest: questId });
  return response.data;
};

// ✅ 퀘스트 삭제
export const deleteQuest = async (questId) => {
  await axios.delete(`/quests/${questId}/`);
};

// ✅ 사용자 상태 (레벨, 경험치, 코인)
export const getUserStats = async () => {
  const response = await axios.get('/stats/');
  return response.data[0]; // 첫 번째 유저 기준
};

// ✅ 사용자 상태 초기화
export const resetUserState = async () => {
  await axios.post('/reset/');
};