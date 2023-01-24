// store.ts
import { configureStore } from "@reduxjs/toolkit";
import errorSlice from "./errorSlice";
import postSlice from './postSlice';
import userSlice from './userSlice';


const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    posts: postSlice.reducer,
    errors: errorSlice.reducer,
  }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;