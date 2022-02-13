import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import "colors";

dotenv.config();

// Connect Database
import connectDB from "./db/connect.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
import customers from "./routes/customers.js";
import appointment from "./routes/appointment.js";

app.use("/api/v1/customers", customers);
app.use("/api/v1/appointment", appointment);

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
