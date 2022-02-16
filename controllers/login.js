import Administrators from "../models/administratorsModel.js";
import Appointments from "../models/appointmentsModel.js";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import EventEmitter from "events";
import axios from "axios";

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
let m = 0;
myEmitter.on("event", async (token) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-");
  }
  const appointments = await Appointments.find({
    date: formatDate(tomorrow),
  }).sort([["time", 1]]);

  // Iterate appointments and Send email

  try {
    for (let i = 0; i < appointments.length; ++i) {
      if (appointments[i].sendReminder && !appointments[i].emailIsSent) {
        // Get Customer Data
        console.log("fetching user data");
        const customer = await axios.get(
          `http://localhost:${process.env.PORT}/api/v1/customers/${appointments[i].customer}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (customer.data) {
          console.log("sending email");
          const { fullname, email } = customer.data.customer;
          const payload = {
            email: email,
            fullname: fullname,
            appointment: `${appointments[i].date} ${appointments[i].time}`,
            description: appointments[i].description,
          };
          // Send Email
          const sendEmail = await axios.post(
            "http://localhost:5000/api/v1/sendEmail",
            payload,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          /*           if (sendEmail.status === 200) {
            console.log("update appointment");
            const updateAppointment = await axios.patch(
              `http://localhost:5000/api/v1/appointment/${appointments[i]._id}`,
              { emailIsSent: true },
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            );
            console.log(updateAppointment.status);
          } */
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
});

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
  myEmitter.emit("event", `${token}`);
  res.json({
    admin: { name: admin.fullname, privilege: admin.privilege },
    token,
  });
};
