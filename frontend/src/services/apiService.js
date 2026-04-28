import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const parkingService = {
  getZones: async () => {
    const response = await api.get('/zones');
    return response.data;
  },
  getZoneById: async (id) => {
    const response = await api.get(`/zones/${id}`);
    return response.data;
  },
};

export const bookingService = {
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },
  getUserBookings: async (userId) => {
    const response = await api.get(`/bookings/user/${userId}`);
    return response.data;
  },
  updateStatus: async (id, statusData) => {
    const response = await api.patch(`/bookings/${id}/status`, statusData);
    return response.data;
  },
};

export const valetService = {
  getValetStatus: async (bookingId) => {
    const response = await api.get(`/valet/${bookingId}`);
    return response.data;
  },
  updateValetStatus: async (bookingId, statusData) => {
    const response = await api.patch(`/valet/${bookingId}/status`, statusData);
    return response.data;
  },
};

export default api;
