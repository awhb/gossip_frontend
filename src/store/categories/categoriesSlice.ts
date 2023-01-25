import { CategoriesModel } from "../../models/redux-model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialCategoriesState:CategoriesModel = {
    all_categories: [],
  }

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialCategoriesState,
  reducers: {
    // Upon create, update, delete posts
    setAllCategories(state, action: PayloadAction<string[]>) {
      state.all_categories = action.payload;
    },
  }
});

export default categoriesSlice;