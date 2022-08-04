import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

const initialState = {
  admins: [],
  singleAdmin: null,
  isError: false,
  isSuccess: false,
  isSuccessUpdate: false,
  isLoadingGetAll: false,
  isSuccessGetAll: false,
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
  async (queryObject, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await adminService.getAdmins(queryObject, token);
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
export const update = createAsyncThunk(
  "admin/update",
  async (adminData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await adminService.update(adminData, token);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isSuccessUpdate = false;
      state.isLoadingGetAll = false;
      state.isSuccessGetAll = false;
      state.isError = false;
      state.isLoading = false;
      state.singleAdmin = null;
    },
    resetWithoutAdmin: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
    },
    resetAdmins: (state) => {
      state.admins = [];
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
        state.isLoadingGetAll = true;
      })
      .addCase(getAdmins.fulfilled, (state, action) => {
        state.isLoadingGetAll = false;
        state.isSuccessGetAll = true;
        console.log(action.payload);
        state.admins = action.payload;
      })
      .addCase(getAdmins.rejected, (state, action) => {
        state.isLoadingGetAll = true;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAdmin.pending, (state) => {
        state.isLoading = true;
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
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessUpdate = true;
        state.admins = state.admins.map((admin) => {
          if (admin._id === action.payload.admin._id) {
            return { ...action.payload.admin };
          }
          return admin;
        });
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccessUpdate = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetWithoutAdmin, resetAdmins } = adminSlice.actions;
export default adminSlice.reducer;
