// src/Api/AttendanceApi.js
import axios from "axios";

const BASE_URL = "https://hms-back-5gbr.onrender.com/api/v1/attendance";

// Get all attendance records
export const getAllAttendance = async () => {
  return await axios.get(`${BASE_URL}/all`);
};

// Employee check-in
export const checkIn = async (employeeId) => {
  return await axios.post(`${BASE_URL}/checkin`, { employeeId });
};

// Employee check-out
export const checkOut = async (attendanceId) => {
  return await axios.post(`${BASE_URL}/checkout/${attendanceId}`);
};
