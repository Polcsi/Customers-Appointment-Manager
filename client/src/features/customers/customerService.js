import axios from "axios";

const API_URL = "api/v1/customers";

// Get All Customer
const getAllCustomer = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data.customers;
};

const customerService = {
  getAllCustomer,
};

export default customerService;
