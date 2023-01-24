// export const login = createAsyncThunk("auth/login", async (payload) => {
//     const {username, password} = payload;
//     try {
//         const response = await axios.post("/login", { username, password });
//         localStorage.setItem("token", response.data.token);
//         return response.data;
//     } catch (error) {
//         throw error.response.data.error;
//     }
// });

// const authSlice = createSlice({
//     name: "auth",
//     initialState: {
//         token: "",
//         user: {},
//         isAuthenticated: false,
//         isLoading: false,
//         error: null
//     },
//     reducers: {
//         loginRequest: (state) => {
//             state.isLoading = true;
//         },
//         loginSuccess: (state, { payload }) => {
//             state.token = payload.token;
//             state.user = payload.user;
//             state.isAuthenticated = true;
//             state.isLoading = false;
//         },
//         loginFailure: (state, { payload }) => {
//             state.error = payload;
//             state.isLoading = false;
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(login.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(login.fulfilled, (state, action) => {
//                 state.token = action.payload.token;
//                 state.user = action.payload.user;
//                 state.isAuthenticated = true;
//                 state.isLoading = false;
//             })
//             .addCase(login.rejected, (state, action) => {
//                 state.error = action.payload as string;
//                 state.isLoading = false;
//             });
//     }
// });


import { UserModel, UserArrayModel } from "../../src/models/redux-model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialUserState:UserArrayModel = {
  all_users: [],
  current_user: {
    "id": 0,
    "username": "",
    "created_at": new Date("2023-01-25"),
  },
  particular_user: {
    "id": 0,
    "username": "",
    "created_at": new Date("2023-01-25"),
  }
}

const userSlice = createSlice({
  name: "users",
  initialState: initialUserState,
  reducers: {
    setUsers(state, action: PayloadAction<UserModel[]>) {
      state.all_users = action.payload;
    }, 
    setCurrentUser(state, action: PayloadAction<UserModel>) {
      state.current_user = action.payload;
    },
    setParticularUser(state, action: PayloadAction<UserModel>) {
      state.particular_user = action.payload;
    },
  }
});

export default userSlice;