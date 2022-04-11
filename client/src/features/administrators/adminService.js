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

// Delete Admin
const deleteAdmin = async (adminId, token) => {
  const response = await axios.delete(`${API_URL}administrators/${adminId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const adminService = {
  register,
  getAdmins,
  deleteAdmin,
};

export default adminService;
