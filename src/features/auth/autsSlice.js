import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://asistant-kulit-production-7ab2.up.railway.app/api/auth';

export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${API_URL}/register`, data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.msg || 'Register gagal');
  }
});

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${API_URL}/login`, data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.msg || 'Login gagal');
  }
});

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
