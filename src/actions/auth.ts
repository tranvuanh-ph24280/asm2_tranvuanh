import {  signin, signup } from "@/api/auth";
import {  saveTokenToLocalStorage } from "@/localStorageUtils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk('auth/loginUser', async (userData) => {
  try {
    const { data } = await signin(userData);

    // Lưu token vào Local Storage
    saveTokenToLocalStorage(data.accessToken);
    localStorage.setItem('username', data.user.email);
    return data;
  } catch (error:any) {
    return error.message;
  }
});
  // Tạo action async thunk để đăng ký
  export const registerUser = createAsyncThunk('auth/registerUser', async (formData) => {
    try {
        const { data } = await signup(formData)
        return data
    } catch (error:any) {
    //   throw new Error('Có lỗi xảy ra khi đăng ký.');
       return error = error.message
    }
  })