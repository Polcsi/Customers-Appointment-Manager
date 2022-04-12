import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

const initialState = {
  admins: [],
  singleAdmin: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register Admin
export const register = createAsyncThunk(
  "admin/register",
  async (adminData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await adminService.register(adminData, token);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Admins
export const getAdmins = createAsyncThunk(
  "admin/getAdmins",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await adminService.getAdmins(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Admin
export const getAdmin = createAsyncThunk(
  "admin/getAdmin",
  async (adminData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await adminService.getAdmin(adminData, token);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Admin
export const deleteAdmin = createAsyncThunk(
  "admin/delete",
  async (adminData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await adminService.deleteAdmin(adminData, token);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Admin

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.singleAdmin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admins.push(action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAdmins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdmins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admins = action.payload;
      })
      .addCase(getAdmins.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAdmin.pending, (state) => {
        state.isLoading = true;
        state.singleAdmin = { admin: null };
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleAdmin = action.payload;
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admins = state.admins.filter(
          (admin) => admin._id !== action.payload.admin._id
        );
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
