import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import uiReducer from '../features/ui/uiSlice';
import parkingReducer from '../features/parking/parkingSlice';
import valetReducer from '../features/valet/valetSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    parking: parkingReducer,
    valet: valetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Firebase user objects may contain non-serializable values
        ignoredActions: ['auth/setUser'],
        ignoredPaths: ['auth.user'],
      },
    }),
});

export default store;
