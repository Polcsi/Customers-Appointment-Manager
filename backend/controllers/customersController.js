import Customers from "../models/customersModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const getAllCustomers = async (req, res) => {
  const customers = await Customers.find().sort("lastname");
  res
    .status(StatusCodes.OK)
    .json({ msg: "success", customers, total: customers.length });
};

const createCustomer = async (req, res) => {
  const customer = await Customers.create(req.body);
  res.status(StatusCodes.OK).json({
    msg: "success",
    customer,
  });
};

const getCustomer = async (req, res) => {
  const {
    params: { id: customerId },
  } = req;
  const customer = await Customers.findOne({ _id: customerId });
  if (!customer) {
    throw new NotFoundError(`no customer with id ${customerId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "success", customer });
};

const deleteCustomer = (req, res) => {
  res.json({ msg: "success", action: "Delete Customer" });
};

const updateCustomer = (req, res) => {
  res.json({ msg: "success", action: "Update Customer" });
};

export {
  createCustomer,
  getAllCustomers,
  getCustomer,
  deleteCustomer,
  updateCustomer,
};
