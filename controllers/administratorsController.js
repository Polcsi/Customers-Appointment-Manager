import Administrators from "../models/administratorsModel.js";
import { StatusCodes } from "http-status-codes";
import {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} from "../errors/index.js";

// @desc    Create Admin
// @route   POST /api/v1/administrators
// @access Private
const createAdmin = async (req, res) => {
  if (req.admin.privilege !== "owner") {
    throw new UnauthenticatedError("not authorized");
  }
  const admin = await Administrators.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ status: "success", admin });
};

// @desc    Get All Admins
// @route   GET /api/v1/administrators
// @access Private
const getAllAdmins = async (req, res) => {
  const admins = await Administrators.find().select(
    "-password -createdAt -updatedAt"
  );
  res.status(StatusCodes.OK).json({ admins, total: admins.length });
};

// @desc    Get Admin
// @route   GET /api/v1/administrators/:id
// @access Private
const getAdmin = async (req, res) => {
  const {
    params: { id: adminId },
  } = req;
  const admin = await Administrators.findOne({ _id: adminId });
  if (!admin) {
    throw new NotFoundError(`no administrator with id : ${adminId}`);
  }
  res.status(StatusCodes.OK).json({ admin });
};

// @desc    Delete Admin
// @route   DELETE /api/v1/administrators/:id
// @access Private
const deleteAdmin = async (req, res) => {
  if (req.admin.privilege !== "owner" && req.admin.privilege !== "admin") {
    throw new UnauthenticatedError("not authorized");
  }
  const {
    params: { id: adminId },
  } = req;
  if (req.admin.id === adminId) {
    throw new BadRequestError("not authorized to delete yourself");
  }
  const admin = await Administrators.findOneAndDelete({ _id: adminId });
  res
    .status(StatusCodes.OK)
    .json({ status: "admin successfully deleted", admin });
};

// @desc    Update Admin
// @route   PATCH /api/v1/administrators/:id
// @access Private
const updateAdmin = async (req, res) => {
  if (req.admin.privilege !== "owner" && req.admin.privilege !== "admin") {
    throw new UnauthenticatedError("not authorized");
  }
  const {
    params: { id: adminId },
  } = req;
  const admin = await Administrators.findOneAndUpdate(
    { _id: adminId },
    { ...req.body },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ status: "sucess", admin });
};

export { createAdmin, getAllAdmins, getAdmin, deleteAdmin, updateAdmin };
