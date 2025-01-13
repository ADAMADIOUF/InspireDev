import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: (() => {
    try {
      const userInfo = localStorage.getItem('userInfo')
      return userInfo ? JSON.parse(userInfo) : null
    } catch (error) {
      console.error("Failed to parse 'userInfo' from localStorage:", error)
      return null
    }
  })(),
}

// In authSlice.js
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      // Store the user info (including token) in localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      // Remove user info (including token) from localStorage
      localStorage.removeItem('userInfo');
    },
  },
});


export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
