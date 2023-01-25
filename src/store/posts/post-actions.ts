import postSlice from "./postSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { ErrorModel, PostModel } from "../../models/redux-model";
import postService from "../../services/postService";
import errorSlice from "../errors/errorSlice";

export const postActions = postSlice.actions;
export const errorActions = errorSlice.actions;



// index
export const fetchPosts = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch,getState) => {
    const response: PostModel[] = await postService.getAllPosts();
    dispatch(postActions.setPosts(response));
  };
}

// show
export const fetchSelectedPost = (post_id:number): ThunkAction<void, RootState, unknown, AnyAction> => { 
  return async (dispatch,getState) => {
    const response: PostModel = await postService.getSelectedPost(post_id);
    dispatch(postActions.setSelectedPost(response));
  };
}

// create post
export const createPost = (title:string, content:string, user_id: number, categories: string[]): ThunkAction<void, RootState, unknown, AnyAction> => { 
  return async (dispatch,getState) => {
    const response: PostModel | ErrorModel = await postService.createPost(title, content, categories, user_id);
    if ("error" in response) {
      dispatch(errorActions.setError(response.error));
    } else { 
      dispatch(errorActions.clearError());
      dispatch(postActions.setSelectedPost(response));
    }

  };
}

// update post
export const updatePost = (post_id:number, title:string, content:string, user_id: number, categories: string[]): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch,getState) => {
    const response: PostModel | ErrorModel = await postService.updatePost(post_id, title, content, categories, user_id);
    if ("error" in response) {
      dispatch(errorActions.setError(response.error));
    } else { 
      dispatch(errorActions.clearError());
      dispatch(postActions.setSelectedPost(response));
    }
  };
}

// delete post
export const deletePost = (post_id:number): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch,getState) => {
    const response: PostModel[] | ErrorModel = await postService.deletePost(post_id);
    if ("error" in response) {
      dispatch(errorActions.setError(response.error));
    } else { 
      dispatch(errorActions.clearError());
      dispatch(postActions.setPosts(response));
    }
  };
}
