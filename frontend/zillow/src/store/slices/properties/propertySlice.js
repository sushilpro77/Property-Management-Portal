import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from "../../../api";

export const loadProperties = createAsyncThunk(
  "properties/load",
  async (params, { rejectWithValue }) => {
    try {
      let baseUrl = "/api/properties";
      if (params.location) {
        baseUrl += `?location=${params.location}`;
      }
      if (params.propertyType) {
        baseUrl += `${params.location ? "&" : "?"}propertyType=${
          params.propertyType
        }`;
      }
      const response = await get(baseUrl);
      console.log("response: ", response);
      return response.data;
    } catch (err) {
      rejectWithValue(err.response);
    }
  }
);

export const applyForProperty = createAsyncThunk(
  "properties/apply",
  async (params, { rejectWithValue }) => {
    try {
      let baseUrl = "/api/applications";
      const response = await post(baseUrl, params.payload);
      console.log("response: ", response);
      return response.data;
    } catch (err) {
      rejectWithValue(err.response);
    }
  }
);

export const loadPropertyStats = createAsyncThunk(
  "properties/apply",
  async (params, { rejectWithValue }) => {
    try {
      let baseUrl = "/api/properties/perLocationStats";
      const response = await get(baseUrl);
      console.log("response: ", response);
      return response.data;
    } catch (err) {
      rejectWithValue(err.response);
    }
  }
);

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: [],
  totalProperties: 0,
  propertyStats: null,
};

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadProperties.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadProperties.fulfilled, (state, action) => {
      const { content, totalElements } = action.payload;
      state.loading = false;
      state.success = true;
      state.error = false;
      state.totalProperties = totalElements;
      state.data = content;
    });

    builder.addCase(loadProperties.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });

    /********************************************************** */
    builder.addCase(loadPropertyStats.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      console.log("Action payload: ", action.payload);
      state.propertyStats = action.payload;
    });
    builder.addCase(loadPropertyStats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadPropertyStats.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
  },
});

export default propertySlice.reducer;
