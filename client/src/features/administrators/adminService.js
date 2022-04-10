import axios from "axios";

const API_URL = "api/v1/";

// Register admin
const register = async (adminData, token) => {
  const response = await axios.post(API_URL + "administrators", adminData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.admin;
};

// Get all admins
const getAdmins = async (token) => {
  const response = await axios.get(API_URL + "administrators", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.admins;
};

const adminService = {
  register,
  getAdmins,
};

export default adminService;
