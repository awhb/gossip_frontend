import { ErrorModel } from "../../models/redux-model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialErrorState:ErrorModel = {
  "error": "",
}

const errorSlice = createSlice({
  name: "error",
  initialState: initialErrorState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    }, 
    // implement clearError on every page load
    clearError(state) {
      state.error = "";
    }
  }
});

export default errorSlice;