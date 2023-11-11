import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  FETCH_USER_BY_ID,
  LOGIN,
  LOGOUT,
  REGISTER,
} from "../ActionType/ActionType";
import { Logout, SignIn, SignUp, getUserById } from "../../API/UserApi";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const isUserLoggedIn = () => {
  const tokenString = Cookies.get("userPayload");
  if (!tokenString) return false;
  const token = JSON.parse(tokenString);
  const jwtToken = token.jwtToken;
  const decodedToken = jwt_decode(jwtToken);
  const isAdmin = decodedToken.roles.includes("ROLE_ADMIN");
  console.log("isAdmin", isAdmin);
  return !!jwtToken;
};

export const register = createAsyncThunk(
  REGISTER,
  async (newUser, { rejectWithValue }) => {
    try {
      const UserNew = await SignUp(newUser);
      console.log("UserNew", UserNew);
      if (UserNew.data) {
        return UserNew;
      } else {
        return rejectWithValue(UserNew);
      }
    } catch (error) {
      throw rejectWithValue(error.response); // Simulate a rejection by throwing the error
    }
  }
);

export const login = createAsyncThunk(
  LOGIN,
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await SignIn(credentials);
      if (response.data) {
        return response;
      } else {
        return rejectWithValue(response);
      }
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

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
        state.error = action.payload.message;
        state.isLoggedIn = false;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.error = action.payload.message;
        state.isAdmin =
          action.payload.data && action.payload.data.roles.includes("admin");
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
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
