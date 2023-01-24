import { UserModel, UserArrayModel } from "../../src/models/redux-model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialUserState:UserArrayModel = {
  all_users: [],
  selected_user: {
    "id": 0,
    "username": "",
    "created_at": new Date("2023-01-25"),
  },
  current_user: {
    "id": 0,
    "username": "",
    "created_at": new Date("2023-01-25"),
  },
  isLoading: false,
  
}

const userSlice = createSlice({
  name: "users",
  initialState: initialUserState,
  reducers: {
    setUsers(state, action: PayloadAction<UserModel[]>) {
      state.all_users = action.payload;
    }, 
    setSelectedUser(state, action: PayloadAction<UserModel>) {
      state.selected_user = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<UserModel>) {
      state.current_user = action.payload;
    },
    clearCurrentUser(state) {
      state.current_user = initialUserState.current_user;
    },
  },
});

export default userSlice;