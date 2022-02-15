import { StatusCodes } from "http-status-codes";
import { MethodFailureError } from "../errors/index.js";
import nodemailer from "nodemailer";
import { google } from "googleapis";

// @desc    Send Email
// @route   POST /api/v1/sendEmail
// @access Private
const sendEmail = async (req, res) => {
  const { email, appointment, description, fullname } = req.body;

  const oAuth2Client = new google.auth.OAuth2(
    process.env.OAUTH_CLIENTID,
    process.env.OAUTH_CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
  oAuth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN,
  });

  try {
    const accessToken = await new Promise((resolve, reject) => {
      oAuth2Client.getAccessToken((err, token) => {
        if (err) {
          reject("Failed to create access token :(");
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    let mailOptions = {
      from: `Company Name <${process.env.MAIL_USERNAME}>`,
      to: email,
      subject: "Appointment Reminder",
      text: appointment + description,
      html: `
        <h2>Reminder for 'something'</h2>
        <p>Hi ${fullname}!<br><br>I am looking forward you the appointment we talked about: ${appointment}</p>
        <p>Description: ${description}</p>
        <br>
        <span>This is an automatic generated email. Do not reply this.</span>
      `,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err, data);
      } else {
        console.log("Email sent successfully");
        res.json({ status: "success", msg: "email is sent" });
      }
    });
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
  } catch (error) {
    console.log(error);
    throw new MethodFailureError("failed to send email");
  }
};

export { sendEmail };
