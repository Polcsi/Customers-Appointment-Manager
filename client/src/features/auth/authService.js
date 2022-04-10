import axios from "axios";

const API_URL = "api/v1/";

// Register admin
const register = async (adminData, token) => {
  console.log(token);
  const response = await axios.post(API_URL + "administrators", adminData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response;
};

// Login admin
const login = async (adminData) => {
  const response = await axios.post(API_URL + "login", adminData);
  if (response.data) {
    localStorage.setItem("admin", JSON.stringify(response.data));
  }

  return response;
};

// Logout admin
const logout = () => {
  localStorage.removeItem("admin");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
