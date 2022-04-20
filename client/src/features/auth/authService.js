import axios from "axios";

const API_URL = "api/v1/";

// Login admin
const login = async (adminData) => {
  const response = await axios.post(API_URL + "login", adminData);
  if (response.data) {
    localStorage.setItem("admin", JSON.stringify(response.data));

    const today = new Date();
    const expiresTommorow = new Date();
    //expiresTommorow.setDate(today.getDate() + 1);
    expiresTommorow.setMinutes(today.getMinutes() + 1);
    //expiresTommorow.setMinutes(expiresTommorow.getTime() + 60 * 1000);
    document.cookie = `admin=${JSON.stringify(
      response.data
    )}; max-age=${60}; Secure; path=/;`;
  }

  return response.data;
};

// Logout admin
const logout = () => {
  localStorage.removeItem("admin");
  document.cookie = `admin=;expires=Thu, 01 Jan 1970 00:00:00 UTC;Secure`;
};

const authService = {
  login,
  logout,
};

export default authService;
