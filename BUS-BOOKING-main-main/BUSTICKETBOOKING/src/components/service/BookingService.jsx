import axiosInstance from "./axiosConfig.jsx";

export const fetchUserBookings = async () => {
  try {
    const response = await axiosInstance.get('/bookings/getByUserId');
    return response.data;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await axiosInstance.post('/bookings/create', bookingData);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const getBookingPreview = async (seatIds, scheduleId) => {
  try {
    const response = await axiosInstance.post('/bookings/preview', {
      seatIds,
      scheduleId
    });
    return response.data;
  } catch (error) {
    console.error("Error getting booking preview:", error);
    throw error;
  }
};