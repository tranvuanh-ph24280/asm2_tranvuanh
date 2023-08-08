// localStorageUtils.js
const TOKEN_KEY = 'access_token';

// Hàm lưu token vào Local Storage
export const saveTokenToLocalStorage = (token) => {
  localStorage.setItem('accessToken', token);
};
// Hàm lấy token từ Local Storage
export const getTokenFromLocalStorage = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Hàm xóa token khỏi Local Storage
export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
};
