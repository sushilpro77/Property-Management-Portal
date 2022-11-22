import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../../../api";
import jwt_decode from "jwt-decode";
import { getToken, logoutUser } from "../../../modules/auth";

export const loginUser = createAsyncThunk("user/login", async (params) => {
  try {
    const response = await post("/api/token", {
      username: params.email,
      password: params.password,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
});

export const signupUser = createAsyncThunk(
  "user/signup",
  async (params, { rejectWithValue }) => {
    try {
      const response = await post("/api/users/register", {
        username: params.username,
        password: params.password,
        fullName: params.fullName,
        email: params.email,
        phoneNumber: params.phoneNumber,
        // TODO: Shouldn't be a url, fix on backend or remove for now
        imageUrl:
          "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset-password",
  async (params) => {
    try {
      const response = await post("/api/reset-password", {
        password: params.password,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

const initialState = {
  loading: false,
  user: {},
  token: null,
  error: null,
  success: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      const token = getToken();
      state.loading = false;
      state.success = true;
      state.token = token;
      state.user = action.payload;
    },
    logout: (state) => {
      logoutUser();
      state.loading = false;
      state.user = {};
      state.token = null;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { token } = action.payload;
      state.loading = false;
      state.success = true;
      state.token = token;
      const userPayload = jwt_decode(token);
      localStorage.setItem("token", token);
      state.user = { ...userPayload };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    /*********************************************************** */

    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    /********************************************************** */

    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
  },
});

export const { loadUser, logout } = userSlice.actions;

export default userSlice.reducer;
