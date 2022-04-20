import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerService";

const initialState = {
  singleCustomer: null,
  allCustomers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  // Add Customer States
  isErrorAdd: false,
  isSuccessAdd: false,
  isLoadingAdd: false,
  messageAdd: "",
  // Delete Customer States
  isErrorDelete: false,
  isSuccessDelete: false,
  isLoadingDelete: false,
  messageDelete: false,
  // Get Customer States
  isLoadingGet: false,
  isSuccessGet: false,
  isErrorGet: false,
  messageGet: "",
  // Update Customer States
  isLoadingUpdate: false,
  isSuccessUpdate: false,
  isErrorUpdate: false,
  messageUpdate: false,
};

// Get Customers
export const getCustomers = createAsyncThunk(
  "customer/getCustomers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await customerService.getAllCustomer(token);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Customer
export const getSingleCustomer = createAsyncThunk(
  "customer/getCustomer",
  async (adminId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await customerService.getSingleCustomer(adminId, token);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add Customer
export const addCustomer = createAsyncThunk(
  "customer/addCustomer",
  async (customerData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await customerService.addCustomer(customerData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// Delete Customer
export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (customerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await customerService.deleteCustomer(customerId, token);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Customer
export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async (customerData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await customerService.updateCustomer(customerData, token);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    resetCustomers: (state) => {
      state.allCustomers = [];
    },
    resetSingleCustomer: (state) => {
      state.singleCustomer = null;
    },
    resetAdd: (state) => {
      state.isLoadingAdd = false;
      state.isSuccessAdd = false;
      state.isErrorAdd = false;
      state.messageAdd = "";
    },
    resetDelete: (state) => {
      state.isLoadingDelete = false;
      state.isErrorDelete = false;
      state.isSuccessDelete = false;
      state.messageDelete = "";
    },
    resetGet: (state) => {
      state.isLoadingGet = false;
      state.isErrorGet = false;
      state.isSuccessGet = false;
      state.messageGet = "";
    },
    resetUpdate: (state) => {
      state.isLoadingUpdate = false;
      state.isErrorUpdate = false;
      state.isSuccessUpdate = false;
      state.messageUpdate = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allCustomers = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
        state.message = action.payload.msg;
      })
      .addCase(getSingleCustomer.pending, (state) => {
        state.isLoadingGet = true;
      })
      .addCase(getSingleCustomer.fulfilled, (state, action) => {
        state.isLoadingGet = false;
        state.isSuccessGet = true;
        state.singleCustomer = action.payload.customer;
      })
      .addCase(getSingleCustomer.rejected, (state, action) => {
        state.isErrorGet = true;
        state.isLoadingGet = false;
        state.messageGet = action.payload.msg;
      })
      .addCase(addCustomer.pending, (state) => {
        state.isLoadingAdd = true;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.isLoadingAdd = false;
        state.isSuccessAdd = true;
        state.allCustomers.push(action.payload.customer);
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.isErrorAdd = true;
        state.messageAdd = action.payload;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.isLoadingDelete = true;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.isLoadingDelete = false;
        state.isSuccessDelete = true;
        state.allCustomers = state.allCustomers.filter(
          (customer) => customer._id !== action.payload.customer._id
        );
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.isLoadingDelete = false;
        state.isErrorDelete = true;
        state.messageDelete = action.payload;
      })
      .addCase(updateCustomer.pending, (state) => {
        state.isLoadingUpdate = true;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isLoadingUpdate = false;
        state.isSuccessUpdate = true;
        state.allCustomers = state.allCustomers.map((customer) => {
          if (customer._id === action.payload.customer._id) {
            return { ...action.payload.customer };
          } else {
            return customer;
          }
        });
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.isLoadingUpdate = false;
        state.isErrorUpdate = true;
        state.messageUpdate = action.payload;
      });
  },
});

export const {
  resetCustomers,
  resetSingleCustomer,
  reset,
  resetAdd,
  resetDelete,
  resetGet,
  resetUpdate,
} = customerSlice.actions;
export default customerSlice.reducer;
