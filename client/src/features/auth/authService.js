import axios from "axios";

const API_URL = "api/v1/";

// Login admin
const login = async (adminData) => {
  const response = await axios.post(API_URL + "login", adminData);
  if (response.data) {
    localStorage.setItem("admin", JSON.stringify(response.data));

    const today = new Date();
    const expiresTommorow = new Date();
    expiresTommorow.setDate(today.getDate() + 1);
    console.log(expiresTommorow);
    document.cookie = `admin=${JSON.stringify(
      response.data
    )};expires=${expiresTommorow};Secure`;
  }

  return response.data;
};

// Logout admin
const logout = () => {
  localStorage.removeItem("admin");
  document.cookie = `admin=;expires=Thu, 01 Jan 1970 00:00:00 UTC;Secure`;
};

// Validate Session

const authService = {
  login,
  logout,
};

export default authService;
