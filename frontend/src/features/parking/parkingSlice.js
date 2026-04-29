import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { parkingService } from '../../services/apiService';

// Async thunks
export const fetchParkingZones = createAsyncThunk(
  'parking/fetchZones',
  async (_, { rejectWithValue }) => {
    try {
      const data = await parkingService.getZones();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch parking zones');
    }
  }
);

const initialState = {
  zones: [],
  selectedZone: null,
  loading: false,
  error: null,
};

const parkingSlice = createSlice({
  name: 'parking',
  initialState,
  reducers: {
    setSelectedZone(state, action) {
      state.selectedZone = action.payload;
    },
    clearSelectedZone(state) {
      state.selectedZone = null;
    },
    clearParkingError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParkingZones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParkingZones.fulfilled, (state, action) => {
        state.loading = false;
        state.zones = action.payload?.data || action.payload || [];
      })
      .addCase(fetchParkingZones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedZone, clearSelectedZone, clearParkingError } = parkingSlice.actions;

export default parkingSlice.reducer;
