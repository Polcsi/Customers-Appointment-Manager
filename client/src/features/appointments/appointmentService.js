import axios from "axios";

const API_URL = "api/v1/appointment";

// Get All Appointment
const getAllAppointments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data.appointments;
};

// Add Appointment
const addAppointment = async (appointmentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, appointmentData, config);
  return response.data;
};

// Delete Appointment
const deleteAppointment = async (appointmentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${appointmentId}`, config);
  return response.data.appointment;
};

const appointmentService = {
  getAllAppointments,
  deleteAppointment,
  addAppointment,
};

export default appointmentService;
