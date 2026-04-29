import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { valetService } from '../../services/apiService';

// Async thunk
export const fetchValetStatus = createAsyncThunk(
  'valet/fetchStatus',
  async (bookingId, { rejectWithValue }) => {
    try {
      const data = await valetService.getValetStatus(bookingId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch valet status');
    }
  }
);

const initialState = {
  status: null,
  currentLocation: null,
  loading: false,
  error: null,
};

const valetSlice = createSlice({
  name: 'valet',
  initialState,
  reducers: {
    setValetLocation(state, action) {
      state.currentLocation = action.payload;
    },
    setValetStatus(state, action) {
      state.status = action.payload;
    },
    clearValetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchValetStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchValetStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload?.data || action.payload;
      })
      .addCase(fetchValetStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setValetLocation, setValetStatus, clearValetError } = valetSlice.actions;

export default valetSlice.reducer;
