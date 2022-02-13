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
  const { sort, sortdesc, date, limit, morning, afternoon } = req.query;

  const queryObject = {};
  if (date) {
    queryObject.date = { $regex: date, $options: "i" };
  }
  if (morning) {
    queryObject["time"] = { $lte: "12:00" };
  }
  if (afternoon) {
    queryObject["time"] = { $gt: "12:00" };
  }

  let result = Appointment.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }
  if (sortdesc) {
    const sortObj = {};
    if (sortdesc.includes("date")) {
      sortObj.date = -1;
    }
    if (sortdesc.includes("time")) {
      sortObj.time = -1;
    }
    if (sortdesc.includes("createdAt")) {
      sortObj.createdAt = -1;
    }

    result = result.sort(sortObj);
  }
  if (limit) {
    result.limit(limit);
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
