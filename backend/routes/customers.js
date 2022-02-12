import express from "express";
const router = express.Router();

import {
  createCustomer,
  getAllCustomers,
  getCustomer,
  deleteCustomer,
  updateCustomer,
} from "../controllers/customersController.js";

router.route("/").post(createCustomer).get(getAllCustomers);
router
  .route("/:id")
  .get(getCustomer)
  .delete(deleteCustomer)
  .patch(updateCustomer);

export default router;
