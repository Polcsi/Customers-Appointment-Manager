import express from "express";
const router = express.Router();

import { login } from "../controllers/login.js";

router.route("/").post(login);

export default router;
