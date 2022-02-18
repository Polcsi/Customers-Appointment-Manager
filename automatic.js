import axios from "axios";
import Appointments from "./models/appointmentsModel.js";
import Customers from "./models/customersModel.js";

async function automaticlySendingEmails() {
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
  console.log("Searching Tomorrow Appointments");
  const appointments = await Appointments.find({
    date: formatDate(tomorrow),
    emailIsSent: false,
    sendReminder: true,
  }).sort([["time", 1]]);
  if (appointments.length === 0) {
    console.log("Appointments Not Found".red);
  }

  // Iterate appointments and Send email

  try {
    for (let i = 0; i < appointments.length; ++i) {
      if (appointments[i].sendReminder && !appointments[i].emailIsSent) {
        // Get Customer Data
        console.log("fetching user data");
        const customer = await Customers.findById(appointments[i].customer);
        if (customer) {
          console.log("Sending Email".cyan);
          const { fullname, email } = customer;
          const payload = {
            email: email,
            fullname: fullname,
            appointment: `${appointments[i].date} ${appointments[i].time}`,
            description: appointments[i].description,
          };
          // Send Email
          const sendEmail = await axios.post(
            `http://localhost:${process.env.PORT}/api/v1/sendEmail`,
            payload
          );
          if (sendEmail.status === 200) {
            console.log("update appointment");
            const updateAppointment = await Appointments.findByIdAndUpdate(
              appointments[i]._id,
              { emailIsSent: true },
              { new: true, runValidators: true }
            );
            if (updateAppointment) {
              console.log("Appointment Updated".green);
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export default automaticlySendingEmails;
