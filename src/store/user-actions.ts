import userSlice from "./userSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { AuthModel, ErrorModel, UserModel } from "../../src/models/redux-model";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";
import errorSlice from "./errorSlice";

export const userActions = userSlice.actions;
export const errorActions = errorSlice.actions;

// index
export const fetchUsers = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch,getState) => {
    const response: UserModel[] = await userService.getAllUsers();
    dispatch(userActions.setUsers(response));
  };
}

// show
export const fetchSelectedUser = (user_id:number): ThunkAction<void, RootState, unknown, AnyAction> => { 
  return async (dispatch,getState) => {
    const response: UserModel = await userService.getSelectedUser(user_id);
    dispatch(userActions.setSelectedUser(response));
  };
}

// create/sign up
export const createUser = (username: string, password:string): ThunkAction<void, RootState, unknown, AnyAction> => { 
  return async (dispatch,getState) => {
    dispatch(userActions.setIsLoading(true));
    const response: AuthModel | ErrorModel = await userService.createUser(username, password);
    if ("error" in response) {
      dispatch(userActions.setIsLoading(false));
      dispatch(errorActions.setError(response.error));
    } else { 
      dispatch(userActions.setCurrentUser(response.user));
      localStorage.setItem("token", response.token);
      dispatch(userActions.setIsLoading(false));
    }
  };
}

// update
export const updateUser = (user_id: number, username: string, password:string): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch,getState) => {
    const response: UserModel | ErrorModel = await userService.updateUser(user_id, username, password);
    if ("error" in response) {
      dispatch(errorActions.setError(response.error));
    } else { 
      dispatch(userActions.setSelectedUser(response));
    }
  };
}

// delete
export const deleteUser = (user_id:number): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch,getState) => {
    const response: UserModel[] | ErrorModel = await userService.deleteUser(user_id);
    if ("error" in response) {
      dispatch(errorActions.setError(response.error));
    } else { 
      dispatch(userActions.setUsers(response));
      localStorage.removeItem("token");
    }
  };
}

// login
export const loginUser = (username:string, password:string): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch,getState) => {
    dispatch(userActions.setIsLoading(true));
    const response: AuthModel | ErrorModel = await userService.loginUser(username, password);
    if ("error" in response) {
      dispatch(userActions.setIsLoading(false));
      dispatch(errorActions.setError(response.error));
    } else { 
      dispatch(userActions.setCurrentUser(response.user));
      localStorage.setItem("token", response.token);
      dispatch(userActions.setIsLoading(false));
    }
  };
}