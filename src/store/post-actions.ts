import postSlice from "./postSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { CategoryModel, PostModel } from "../../src/models/redux-model";
import postService from "../services/postService";
import { useNavigate } from "react-router-dom";

export const postActions = postSlice.actions;

const navigate = useNavigate();

// index
export const fetchPosts = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch,getState) => {
    const response:PostModel[] = await postService.getAllPosts();
    dispatch(postActions.setPosts(response));
  };
}

// show
export const fetchParticularPost = (post_id:number): ThunkAction<void, RootState, unknown, AnyAction> => { 
  return async (dispatch,getState) => {
    const response:PostModel = await postService.getParticularPost(post_id);
    dispatch(postActions.setParticularPost(response));
  };
}

// create post
export const createPost = (title:string, content:string, user_id: number, categories: string[]): ThunkAction<void, RootState, unknown, AnyAction> => { 
  return async (dispatch,getState) => {
    const response: = await postService.createPost(title, content, user_id, categories);
    // if (response["error"]) {
    //   dispatch(errorActions.setError(response));
    // } else { 
    //   dispatch(postActions.setParticularPost(response));
    // }
    dispatch(postActions.setParticularPost(response));
    navigate(`/post/${response.id}`)
    

  };
}

// update post
export const updatePost = (post_id:number, title:string, content:string, user_id: number, categories: string[]): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch,getState) => {
    const response:PostModel = await postService.updatePost(post_id, title, content, user_id, categories);
    dispatch(postActions.setParticularPost(response));
  };
  // remember to redirect in the onSubmit handler in updatePost form
}

// delete post
export const deletePost = (post_id:number): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch,getState) => {
    const response:PostModel = await postService.deletePost(post_id);
    dispatch(postActions.setAllPosts(response));
  };
  // remember to redirect in function that calls deletePost
}
