import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  FETCH_USER_BY_ID,
  LOGIN,
  LOGOUT,
  REGISTER,
} from "../ActionType/ActionType";
import { Logout, SignIn, SignUp, getUserById } from "../../API/UserApi";
import Cookies from "js-cookie";

const isUserLoggedIn = () => {
  const token = Cookies.get("userPayload");
  return !!token;
};

export const register = createAsyncThunk(REGISTER, async (newUser) => {
  const UserNew = await SignUp(newUser);
  return UserNew;
});

export const login = createAsyncThunk(LOGIN, async (UserData) => {
  const DataUser = await SignIn(UserData);
  return DataUser;
});

export const logout = createAsyncThunk(LOGOUT, async () => {
  await Logout();
  Cookies.remove("userPayload");
  localStorage.clear();
  return null;
});

export const fetchUserById = createAsyncThunk(FETCH_USER_BY_ID, async (id) => {
  const singleUser = await getUserById(id);
  return singleUser;
});

const initialState = {
  status: "idle",
  data: [],
  error: null,
  isLoggedIn: isUserLoggedIn(),
  isAdmin: false,
};

const UserSliceReducer = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.error = action.payload.message;
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
        state.error = action.payload.message;
        state.isAdmin = action.payload.data.roles.includes("admin");
        console.log("isAdmin", state.isAdmin);
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.isLoggedIn = false;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchUserById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.error = action.payload.message;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { actions } = UserSliceReducer;
export default UserSliceReducer;
