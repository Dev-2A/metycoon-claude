import axios from './axiosConfig';

export async function login(username, password) {
  const res = await axios.post('/token/', { username, password });
  const { access, refresh } = res.data;
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
  return access;
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

export async function fetchUserInfo() {
  try {
    const res = await axios.get("/user-info/");
    return res.data;
  } catch (err) {
    console.error("❌ 사용자 정보 불러오기 실패:", err)
    return null;
  }
}

export const changePassword = async (currentPassword, newPassword) => {
  const res = await axios.post('/change-password/', {
    current_password: currentPassword,
    new_password: newPassword
  });
  return res.data;
}

export const updateProfile = async ({ email }) => {
  try {
    const res = await axios.post('/update-profile/', { email });
    return res.data;
  } catch (err) {
    console.error("❌ 프로필 업데이트 실패:", err);
    throw err;
  }
}