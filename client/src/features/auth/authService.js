import axios from "axios";

const API_URL = "api/v1/";

// Register admin
const register = async (adminData) => {
  const token = JSON.parse(localStorage.getItem("admin")).token;
  const response = await axios.post(
    "http://localhost:5000/api/v1/administrators",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    adminData
  );

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
  console.log("remove");
  localStorage.removeItem("admin");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
