import commentSlice from "./commentSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { ErrorModel, CommentModel } from "../../models/redux-model";
import commentService from "../../services/commentService";
import errorSlice from "../errors/errorSlice";

export const commentActions = commentSlice.actions;
export const errorActions = errorSlice.actions;



// index
export const fetchComments = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch,getState) => {
    const response: CommentModel[] = await commentService.getAllComments();
    dispatch(commentActions.setComments(response));
  };
}

// create
export const createComment = (content: string, user_id: number, post_id: number): ThunkAction<void, RootState, unknown, AnyAction> => { 
  return async (dispatch,getState) => {
    const response: CommentModel | ErrorModel = await commentService.createComment(content, user_id, post_id);
    if ("error" in response) {
      dispatch(errorActions.setError(response.error));
    } else { 
      dispatch(errorActions.clearError());
      dispatch(commentActions.setSelectedComment(response));
    }

  };
}

// update
export const updateComment = (comment_id: number, content: string, user_id: number, post_id: number): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch,getState) => {
    const response: CommentModel | ErrorModel = await commentService.updateComment(comment_id, content, user_id, post_id);
    if ("error" in response) {
      dispatch(errorActions.setError(response.error));
    } else { 
      dispatch(errorActions.clearError());
      dispatch(commentActions.setSelectedComment(response));
    }
  };
}

// delete
export const deleteComment = (comment_id:number): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch,getState) => {
    const response: CommentModel[] | ErrorModel = await commentService.deleteComment(comment_id);
    if ("error" in response) {
      dispatch(errorActions.setError(response.error));
    } else { 
      dispatch(errorActions.clearError());
      dispatch(commentActions.setComments(response));
    }
  };
}
