import { PostModel, PostArrayModel } from "../../models/redux-model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialPostState:PostArrayModel = {
  all_posts: [],
  selected_post: {
    "id": 0,
    "title": "",
    "content": "",
    "user_id": 0,
    "creator": "",
    "categories": [],
    "created_at": new Date("2023-01-25"),
    "upvotes": 0,
  }
}

const postSlice = createSlice({
  name: "posts",
  initialState: initialPostState,
  reducers: {
    setPosts(state, action: PayloadAction<PostModel[]>) {
      state.all_posts = action.payload;
    }, 
    setSelectedPost(state, action: PayloadAction<PostModel>) {
      state.selected_post = action.payload;
    }
  }
});

export default postSlice;