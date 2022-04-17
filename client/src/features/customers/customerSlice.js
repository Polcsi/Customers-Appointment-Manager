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
    resetAdd: (state) => {
      state.isLoadingAdd = false;
      state.isSuccessAdd = false;
      state.isErrorAdd = false;
      state.messageAdd = "";
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
        state.message = action.payload.msg;
      })
      .addCase(addCustomer.pending, (state, action) => {
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
      });
  },
});

export const { resetCustomers, reset, resetAdd } = customerSlice.actions;
export default customerSlice.reducer;
