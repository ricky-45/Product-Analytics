import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchTrends = createAsyncThunk(
  'trends/fetchTrends',
  async () => {
    const response = await api.get('/sales/trends');
    return response.data;
  }
);

const trendsSlice = createSlice({
  name: 'trends',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrends.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrends.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTrends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default trendsSlice.reducer;