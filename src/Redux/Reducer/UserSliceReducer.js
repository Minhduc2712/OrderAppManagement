import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { LOGIN, REGISTER } from "../ActionType/ActionType";
import { SignIn, SignUp } from "../../API/UserApi";
import Login from "../../pages/Login";


export const register = createAsyncThunk(
    REGISTER,
    async(newUser)=>{
            const UserNew = await SignUp(newUser);
            return UserNew;
        }
);

export const login = createAsyncThunk(
    LOGIN,
    async(UserData)=>{
            const DataUser =await SignIn(UserData);
            return DataUser;
    }
)

export const logout = createAsyncThunk("")

const initialState = {
    status: "idle",
    data: [],
    error: null,
    isLoggedIn:false,
};

const UserSliceReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(register.pending, (state) => {
            state.status = "loading";
        })
        .addCase(register.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload.data;
            state.error= action.payload.message;
            console.log(state.message);
            state.isLoggedIn = true;
        })
        .addCase(register.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
            state.isLoggedIn = false;
        })
        .addCase(login.pending, (state) => {
            state.status = "loading";
        })
        .addCase(login.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload.data;
            state.error= action.payload.message;
            state.isLoggedIn = true;
          })
          .addCase(login.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
            state.isLoggedIn = false;
          });
    },
  });
  
  export const { actions } = UserSliceReducer;
  export default UserSliceReducer;