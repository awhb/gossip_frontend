// store.ts
import { configureStore } from "@reduxjs/toolkit";
import errorSlice from "./errors/errorSlice";
import postSlice from './posts/postSlice';
import userSlice from './users/userSlice';
import commentSlice from './comments/commentSlice';
import categoriesSlice from './categories/categoriesSlice';


const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    posts: postSlice.reducer,
    comments: commentSlice.reducer,
    categories: categoriesSlice.reducer,
    errors: errorSlice.reducer,
  }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;