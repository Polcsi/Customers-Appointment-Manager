import Administrators from "../models/administratorsModel.js";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("please provide username and password");
  }
  const admin = await Administrators.findOne({ username });
  if (!admin) {
    throw new UnauthenticatedError("invalid credentials");
  }
  const isPasswordCorrect = await admin.comparePasswords(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("invalid password");
  }
  const token = admin.createJWT();
  res.json({
    admin: { name: admin.fullname, privilege: admin.privilege },
    token,
  });
};
