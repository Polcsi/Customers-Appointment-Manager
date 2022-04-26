import axios from "axios";

const API_URL = "api/v1/";

// Login admin
const login = async (adminData) => {
  const response = await axios.post(API_URL + "login", adminData);
  if (response.data) {
    document.cookie = `admin=${JSON.stringify(
      response.data
    )}; max-age=${86400}; path=/;`;
    /* document.cookie = `admin=${JSON.stringify(
      response.data
    )}; max-age=${86400}; HttpOnly; path=/;`; */
    /* document.cookie = `admin=${JSON.stringify(
      response.data
    )}; max-age=${86400}; Secure; path=/;`; */
  }

  return response.data;
};

// Logout admin
const logout = () => {
  document.cookie = `admin=;expires=Thu, 01 Jan 1970 00:00:00 UTC;Secure`;
};

const authService = {
  login,
  logout,
};

export default authService;
