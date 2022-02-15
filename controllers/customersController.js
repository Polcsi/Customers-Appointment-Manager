import Customers from "../models/customersModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const getAllCustomers = async (req, res) => {
  const { town, fullname, sort, sortdesc, limit, page } = req.query;
  const queryObject = {};

  if (town) {
    queryObject.town = { $regex: town, $options: "i" };
  }
  if (fullname) {
    queryObject.fullname = { $regex: fullname, $options: "i" };
  }

  let result = Customers.find(queryObject);

  if (sort) {
    result = result.sort(sort);
  }
  if (sortdesc) {
    result = result.sort([[`${sortdesc}`, -1]]);
  }
  if (limit) {
    result.limit(limit);
  }
  if (page) {
    const pageLimit = Number(limit) || 5;
    const skip = pageLimit * (page - 1);

    result = result.skip(skip).limit(pageLimit);
  }

  const customers = await result;
  res
    .status(StatusCodes.OK)
    .json({ status: "success", customers, total: customers.length });
};

const createCustomer = async (req, res) => {
  const customer = await Customers.create(req.body);
  res.status(StatusCodes.CREATED).json({
    status: "success",
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
  res.status(StatusCodes.OK).json({ status: "success", customer });
};

const updateCustomer = async (req, res) => {
  const {
    body: { firstname, lastname, town, email, phone },
    params: { id: customerId },
  } = req;
  let errors = [];
  if (firstname === "") {
    errors = [...errors, "firstname"];
  }
  if (lastname === "") {
    errors = [...errors, "lastname"];
  }
  if (email === "") {
    errors = [...errors, "email"];
  }
  if (phone === "") {
    errors === [...errors, "phone"];
  }
  if (errors.length > 0) {
    const fields = errors
      .map((item) => {
        return item;
      })
      .join(", ");
    throw new BadRequestError(`${fields} fields cannot be empty`);
  }
  const customer = await Customers.findOneAndUpdate(
    { _id: customerId },
    {
      firstname,
      lastname,
      town,
      email,
      phone,
      fullname: `${lastname} ${firstname}`,
    },
    { new: true, runValidators: true }
  );
  if (!customer) {
    throw new NotFoundError(`no customer with id ${customerId}`);
  }
  res.status(StatusCodes.OK).json({ status: "success", customer });
};

const deleteCustomer = async (req, res) => {
  const {
    params: { id: customerId },
  } = req;
  const customer = await Customers.findOneAndDelete({
    _id: customerId,
  });
  if (!customer) {
    throw new NotFoundError(`no customer with id: ${customerId}`);
  }
  res.status(StatusCodes.OK).json({ status: "success", customer });
};

export {
  createCustomer,
  getAllCustomers,
  getCustomer,
  deleteCustomer,
  updateCustomer,
};