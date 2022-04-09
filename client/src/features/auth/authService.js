import axios from "axios";

const API_URL = "/api/v1/administrators";

// Register admin
const register = async (adminData) => {
  const response = await axios.post(API_URL, adminData);
  if (response.data) {
    localStorage.setItem("admin", JSON.stringify(response.data));
  }

  return response;
};

const authService = {
  register,
};

export default authService;
