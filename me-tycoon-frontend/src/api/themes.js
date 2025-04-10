import axios from './axiosConfig';

export async function getThemes() {
  try {
    const res = await axios.get('/themes/');
    return res.data;
  } catch (err) {
    console.error('❌ 테마 불러오기 실패:', err);
    throw new Error('테마 불러오기 실패');
  }
}

export async function buyTheme(themeId) {
  try {
    const res = await axios.post(`/themes/${themeId}/buy/`);
    return res.status === 200;
  } catch (error) {
    console.error('buyTheme error:', error);
    alert('❌ 테마 구매에 실패했습니다.');
    return false;
  }
}

export async function applyTheme(themeId) {
  try {
    const res = await axios.post(`/themes/${themeId}/apply/`);
    return res.status === 200;
  } catch {
    alert('❌ 테마 적용에 실패했습니다.');
    return false;
  }
}