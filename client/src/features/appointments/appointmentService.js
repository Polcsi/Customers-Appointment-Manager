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

const appointmentService = {
  getAllAppointments,
};

export default appointmentService;
