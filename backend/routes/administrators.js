import express from "express";
const router = express.Router();

import {
  createAdmin,
  getAllAdmins,
  getAdmin,
  deleteAdmin,
  updateAdmin,
} from "../controllers/administratorsController.js";

router.route("/").post(createAdmin).get(getAllAdmins);
router.route("/:id").get(getAdmin).delete(deleteAdmin).patch(updateAdmin);

export default router;
