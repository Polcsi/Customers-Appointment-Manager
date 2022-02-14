import jwt from "jsonwebtoken";
import Administrators from "../models/administratorsModel.js";
import { UnauthenticatedError } from "../errors/index.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Get admin from the token
    req.admin = await Administrators.findById(payload.id).select("-password");
    if (!req.admin) {
      throw new UnauthenticatedError("administrator does not exist");
    }
    next();
  } catch (error) {
    throw new UnauthenticatedError("not authorized");
  }
};
