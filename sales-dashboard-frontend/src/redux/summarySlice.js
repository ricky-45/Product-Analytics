import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchSummary = createAsyncThunk(
  'summary/fetchSummary',
  async () => {
    const response = await api.get('/sales/summary');
    return response.data;
  }
);

const summarySlice = createSlice({
  name: 'summary',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default summarySlice.reducer;
