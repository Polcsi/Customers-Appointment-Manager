import Appointment from "../models/appointmentsModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

// @desc    Create Appointment
// @route   POST /api/v1/appointment
// @access Private
const createAppointment = async (req, res) => {
  const appointment = await Appointment.create(req.body);
  res.status(StatusCodes.CREATED).json({ status: "success", appointment });
};

// @desc    Update Appointment
// @route   PATCH /api/v1/appointment/:id
// @access Private
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

// @desc    Remove Appointment
// @route   DELETE /api/v1/appointment/:id
// @access Private
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

// @desc    Get Appointment
// @route   GET /api/v1/appointment/:id
// @access Private
const getAppointment = async (req, res) => {
  const {
    params: { id: appointmentId },
  } = req;
  const appointment = await Appointment.findOne({
    _id: appointmentId,
  })
    .populate("customer", "-createdAt -updatedAt -__v")
    .exec();
  if (!appointment) {
    throw new NotFoundError(`no appointment with id ${appointmentId}`);
  }
  res.status(StatusCodes.OK).json({ status: "success", appointment });
};

// @desc    Get All Appointment
// @route   GET /api/v1/appointment
// @access Private
const getAllAppointment = async (req, res) => {
  const { sort, sortdesc, date, limit, morning, afternoon } = req.query;

  const queryObject = {};
  let sortObject = {};
  if (date) {
    queryObject.date = { $regex: date, $options: "i" };
  }
  if (morning) {
    queryObject["time"] = { $lte: "12:00" };
  }
  if (afternoon) {
    queryObject["time"] = { $gt: "12:00" };
  }

  if (sort) {
    const sortParams = sort.split(",");
    sortParams.forEach((item) => {
      if (item === "date") {
        sortObject = { [item]: 1, ...sortObject };
      } else {
        sortObject = { ...sortObject, [item]: 1 };
      }
    });
  }
  if (sortdesc) {
    const sortParams = sortdesc.split(",");
    sortParams.forEach((item) => {
      if (item === "date") {
        sortObject = { [item]: -1, ...sortObject };
      } else {
        sortObject = { ...sortObject, [item]: -1 };
      }
    });
  }

  let result = Appointment.find(queryObject)
    .populate({
      path: "customer",
      select: "fullname",
    })
    .sort(sortObject)
    .limit(limit)
    .exec();

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
