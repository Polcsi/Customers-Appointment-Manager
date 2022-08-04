import axios from "axios";
import { convertQueryObjectToString } from "../../utils";

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
const getAdmins = async (queryObject, token) => {
  const queryString = convertQueryObjectToString(queryObject);
  const response = await axios.get(`${API_URL}administrators?${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(queryString);
  console.log(response.data);
  return response.data.admins;
};

// Get Admin
const getAdmin = async (adminId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `${API_URL}administrators/${adminId}`,
    config
  );
  return response.data;
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

// Update Admin
const update = async (adminData, token) => {
  const response = await axios.patch(
    `${API_URL}administrators/${adminData.id}`,
    adminData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const adminService = {
  register,
  getAdmins,
  getAdmin,
  deleteAdmin,
  update,
};

export default adminService;
