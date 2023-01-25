import { CommentModel, CommentArrayModel } from "../../models/redux-model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialCommentState:CommentArrayModel = {
  all_comments: [],
  selected_comment: {
    "id": 0,
    "content": "",
    "creator": "",
    "post_id": 0,
    "created_at": new Date("2023-01-25"),
    "updated_at": new Date("2023-01-25"),
  }
}

const commentSlice = createSlice({
  name: "comments",
  initialState: initialCommentState,
  reducers: {
    setComments(state, action: PayloadAction<CommentModel[]>) {
      state.all_comments = action.payload;
    }, 
    setSelectedComment(state, action: PayloadAction<CommentModel>) {
      state.selected_comment = action.payload;
    }
  }
});

export default commentSlice;