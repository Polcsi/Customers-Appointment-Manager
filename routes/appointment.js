import express from "express";
const router = express.Router();

import {
  createAppointment,
  getAllAppointment,
  getAppointment,
  deleteAppointment,
  updateAppointment,
} from "../controllers/appointmentController.js";

router.route("/").get(getAllAppointment).post(createAppointment);
router
  .route("/:id")
  .get(getAppointment)
  .delete(deleteAppointment)
  .patch(updateAppointment);

export default router;
