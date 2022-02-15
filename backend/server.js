import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import "colors";

dotenv.config();
// Protect Routes with authentication
import { protect } from "./middleware/authentication.js";

// Connect Database
import connectDB from "./db/connect.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
import customers from "./routes/customers.js";
import appointment from "./routes/appointment.js";
import login from "./routes/login.js";
import admin from "./routes/administrators.js";
import sendEmail from "./routes/sendEmail.js";

app.use("/api/v1/customers", protect, customers);
app.use("/api/v1/appointment", protect, appointment);
app.use("/api/v1/login", login);
app.use("/api/v1/administrators", protect, admin);
app.use("/api/v1/sendEmail", protect, sendEmail);

import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

// Middleware Error Handling
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database Connected".underline.cyan);
    app.listen(port, () => {
      console.log(`Server is Listening on port ${port}...`.yellow);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
