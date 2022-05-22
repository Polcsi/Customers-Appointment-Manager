import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appointmentService from "./appointmentService";
import { formatDate } from "../../utils";

const initialState = {
  appointments: [],
  todayAppointments: [],
  tomorrowAppointments: [],
  dayAfterTomorrowAppointments: [],
  queryObject: {},
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
  // Add States
  isErrorAdd: false,
  isSuccessAdd: false,
  isLoadingAdd: false,
  messageAdd: "",
};

// Get Appointments
export const getAppointments = createAsyncThunk(
  "appointment/getAppointments",
  async (queryObject, thunkAPI) => {
    try {
      queryObject = { ...queryObject, sort: "time", sortdesc: "date" };
      const token = thunkAPI.getState().auth.admin.token;
      return await appointmentService.getAllAppointments(queryObject, token);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Today Appointments
export const getToday = createAsyncThunk(
  "appointment/getToday",
  async (_, thunkAPI) => {
    const today = new Date();
    const queryObject = { date: `${formatDate(today)}`, sort: "time" };
    const token = thunkAPI.getState().auth.admin.token;
    return await appointmentService.getAllAppointments(queryObject, token);
  }
);

// Get Tomorrow Appointments
export const getTomorrow = createAsyncThunk(
  "appointment/getTomorrow",
  async (_, thunkAPI) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const queryObject = { date: `${formatDate(tomorrow)}`, sort: "time" };
    const token = thunkAPI.getState().auth.admin.token;
    return await appointmentService.getAllAppointments(queryObject, token);
  }
);

// Get Day After Tomorrow Appointments
export const getDayAfterTomorrow = createAsyncThunk(
  "appointment/getDayAfterTomorrow",
  async (_, thunkAPI) => {
    const today = new Date();
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    const queryObject = {
      date: `${formatDate(dayAfterTomorrow)}`,
      sort: "time",
    };
    const token = thunkAPI.getState().auth.admin.token;
    return await appointmentService.getAllAppointments(queryObject, token);
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

// Add Appointment
export const addAppointment = createAsyncThunk(
  "appointment/add",
  async (appointmentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await appointmentService.addAppointment(appointmentId, token);
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
    resetAdd: (state) => {
      state.isErrorAdd = false;
      state.isLoadingAdd = false;
      state.isSuccessAdd = false;
      state.messageAdd = "";
    },
    setQueryObject: (state, action) => {
      state.queryObject = action.payload;
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
      })
      .addCase(addAppointment.pending, (state) => {
        state.isLoadingAdd = true;
      })
      .addCase(addAppointment.fulfilled, (state) => {
        state.isLoadingAdd = false;
        state.isSuccessAdd = true;
      })
      .addCase(addAppointment.rejected, (state, action) => {
        state.isLoadingAdd = false;
        state.isErrorAdd = true;
        state.messageAdd = action.payload;
      })
      .addCase(getToday.fulfilled, (state, action) => {
        state.todayAppointments = action.payload;
      })
      .addCase(getTomorrow.fulfilled, (state, action) => {
        state.tomorrowAppointments = action.payload;
      })
      .addCase(getDayAfterTomorrow.fulfilled, (state, action) => {
        state.dayAfterTomorrowAppointments = action.payload;
      });
  },
});

export const {
  reset,
  resetAppointments,
  resetAppointmentDelete,
  resetAdd,
  setQueryObject,
} = appointmentSlice.actions;
export default appointmentSlice.reducer;
