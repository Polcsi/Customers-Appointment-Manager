import Appointment from "../models/appointmentsModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createAppointment = async (req, res) => {
  const appointment = await Appointment.create(req.body);
  res.status(StatusCodes.CREATED).json({ status: "success", appointment });
};

const updateAppointment = async (req, res) => {
  const {
    params: { id: appointmentId },
  } = req;
  const appointment = await Appointment.findOneAndUpdate(
    { _id: appointmentId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!appointment) {
    throw new NotFoundError(`no appointment with id: ${appointmentId}`);
  }
  res.status(StatusCodes.OK).json({ status: "success", appointment });
};

const deleteAppointment = async (req, res) => {
  const {
    params: { id: appointmentId },
  } = req;
  const appointment = await Appointment.findOneAndDelete({
    _id: appointmentId,
  });
  if (!appointment) {
    throw new NotFoundError(`no appointment with id: ${appointmentId}`);
  }
  res.status(StatusCodes.OK).json({ status: "success", appointment });
};

const getAppointment = async (req, res) => {
  const {
    params: { id: appointmentId },
  } = req;
  const appointment = await Appointment.findOne({ _id: appointmentId });
  if (!appointment) {
    throw new NotFoundError(`no appointment with id ${appointmentId}`);
  }
  res.status(StatusCodes.OK).json({ status: "success", appointment });
};

const getAllAppointment = async (req, res) => {
  const { sort, sortdesc, date, time } = req.query;

  let result = Appointment.find();

  if (sort) {
    result = result.sort(sort);
  }
  if (sortdesc) {
    result = result.sort([[`${sortdesc}`, -1]]);
  }

  const appointments = await result;
  res
    .status(StatusCodes.OK)
    .json({ status: "success", appointments, total: appointments.length });
};

export {
  createAppointment,
  getAllAppointment,
  getAppointment,
  deleteAppointment,
  updateAppointment,
};
