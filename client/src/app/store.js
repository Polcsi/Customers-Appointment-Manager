import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import adminReducer from "../features/administrators/adminSlice";
import customerReducer from "../features/customers/customerSlice";
import appointmentReducer from "../features/appointments/appointmentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    customer: customerReducer,
    appointment: appointmentReducer,
  },
});
