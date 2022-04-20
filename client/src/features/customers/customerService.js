import axios from "axios";
import { checkCookieExists } from "../../vaidateSession";

const API_URL = "api/v1/customers";

// Get All Customer
const getAllCustomer = async (token) => {
  if (checkCookieExists()) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL, config);
    return response.data.customers;
  } else {
    throw new Error({ msg: "Your Session Expired" });
  }
};

// Get Customer
const getSingleCustomer = async (customerId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${customerId}`, config);
  return response.data;
};

// Add Customer
const addCustomer = async (customerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, customerData, config);
  return response.data;
};

// Delete Customer
const deleteCustomer = async (customerId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${customerId}`, config);
  return response.data;
};

// Update Customer
const updateCustomer = async (customerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    `${API_URL}/${customerData.id}`,
    customerData,
    config
  );
  return response.data;
};

const customerService = {
  getAllCustomer,
  getSingleCustomer,
  addCustomer,
  deleteCustomer,
  updateCustomer,
};

export default customerService;
