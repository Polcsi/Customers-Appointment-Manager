import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const AdministratorsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Provide Username"],
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    fullname: {
      type: String,
      required: [true, "Please Provide Name"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please Provide Password"],
      minlength: 5,
    },
    privilege: {
      type: String,
      enum: {
        values: ["owner", "admin", "member"],
        message: "{VALUE} is not supported",
      },
      required: [true, "Please Provide Privilege"],
    },
    profilPicture: {
      type: String,
      required: false,
      default: "default",
    },
  },
  { timestamps: true }
);

AdministratorsSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AdministratorsSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      name: this.fullname,
      privilege: this.privilege,
      profilPicture: this.profilPicture,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

AdministratorsSchema.methods.comparePasswords = async function (
  candidatePassword
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const db = mongoose.model("Administrators", AdministratorsSchema);

export default db;
