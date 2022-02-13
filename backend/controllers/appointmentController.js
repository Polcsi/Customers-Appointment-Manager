import { StatusCodes } from "http-status-codes";

const createAppointment = async (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ status: "success", msg: "Create Appointment" });
};

const updateAppointment = async (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ status: "success", msg: "Update Appointment" });
};

const deleteAppointment = async (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ status: "success", msg: "Delete Appointment" });
};

const getAppointment = async (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ status: "success", msg: "Get Appointment" });
};

const getAllAppointment = async (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ status: "success", msg: "Get All Appointments" });
};

export {
  createAppointment,
  getAllAppointment,
  getAppointment,
  deleteAppointment,
  updateAppointment,
};
