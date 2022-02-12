import mongoose from "mongoose";

const CustomersSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      requird: [true, "Please Provide First Name"],
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Please Provide Last Name"],
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    town: {
      type: String,
      trim: true,
      maxlength: 80,
      default: "-",
    },
    email: {
      type: String,
      required: [true, "Please Proivide Email Address"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please Provide Valid Email Address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Please Provide Phone Number"],
      match: [
        /^\+36\s[0-9]{2}\s[0-9]{3}\s[0-9]{3}$/,
        "Please Provide Valid Hungarian Phone Number",
      ],
    },
  },
  { timestamps: true }
);

const customersDB = mongoose.model("Customers", CustomersSchema);

export default customersDB;
