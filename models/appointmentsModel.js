import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers",
      required: [true, "Please Provide Customer"],
    },
    date: {
      type: String,
      required: [true, "Please Provide Date"],
      match: [
        /^[0-9]{4}\-(0[0-9]|1[0-2])\-((((0|1|2)[0-9])|3[0-1]))|([0-9])$/,
        "Please Provide Valid Date Format",
      ],
    },
    time: {
      type: String,
      required: [true, "Please Provide Time"],
      match: [
        /^(((0|1)[0-9])|2[0-3])\:([0-5][0-9])|([0-9])$/,
        "Please Provide Valid Time Format",
      ],
    },
    description: {
      type: String,
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
