import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appointmentService from "./appointmentService";

const initialState = {
  appointments: [],
  singleAppointment: null,
  // Get All States
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  // Delete States
  isErrorDelete: false,
  isSuccessDelete: false,
  isLoadingDelete: false,
  messageDelete: "",
};

// Get Appointments
export const getAppointments = createAsyncThunk(
  "appointment/getAppointments",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await appointmentService.getAllAppointments(token);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Appointment
export const deleteAppointment = createAsyncThunk(
  "appointment/deleteAppointment",
  async (appointmentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await appointmentService.deleteAppointment(appointmentId, token);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    resetAppointments: (state) => {
      state.appointments = [];
    },
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    resetAppointmentDelete: (state) => {
      state.isLoadingDelete = false;
      state.isSuccessDelete = false;
      state.isErrorDelete = false;
      state.messageDelete = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppointments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.appointments = action.payload;
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteAppointment.pending, (state) => {
        state.isLoadingDelete = true;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.isLoadingDelete = false;
        state.isSuccessDelete = true;
        state.appointments = state.appointments.filter(
          (appointment) => appointment._id !== action.payload._id
        );
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.isLoadingDelete = false;
        state.isErrorDelete = true;
        state.messageDelete = action.payload;
      });
  },
});

export const { reset, resetAppointments, resetAppointmentDelete } =
  appointmentSlice.actions;
export default appointmentSlice.reducer;
