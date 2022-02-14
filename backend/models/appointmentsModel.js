import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers",
      required: [true, "please provide customer"],
    },
    date: {
      type: String,
      required: [true, "please provide date"],
      match: [
        /^[0-9]{4}\-(0[0-9]|1[0-2])\-(((0|1|2)[0-9])|3[0-1])$/,
        "please provide valid date format",
      ],
    },
    time: {
      type: String,
      required: [true, "please provide time"],
      match: [
        /^(((0|1)[0-9])|2[0-3])\:[0-5][0-9]$/,
        "please provide valid time format",
      ],
    },
    description: {
      type: String,
      minLength: 10,
      trim: true,
      lowercase: true,
    },
    emailIsSent: {
      type: Boolean,
      default: false,
    },
    sendReminder: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const appointmentsDB = mongoose.model("Appointments", AppointmentSchema);

export default appointmentsDB;
