import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {get, post} from "../../../api";
import jwt_decode from "jwt-decode";
import {getToken} from "../../../modules/auth";

export const getApplication = createAsyncThunk("dashboard/application", async (param) =>{
try {
    const response = await get("/api/applications", {
        propertyId: param.propertyId,
        submissionDate: param.submissionDate,
        locationId: param.locationId
    });
    return response.data;
} catch (err) {
    throw err;
}
});

const initialState = {
    loading: false,
    application: [],
    error: null,
    success: null,
};

const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
        // loadApplication: (state, action) => {
        //     state.loading = false;
        //     state.success = true;
        //     state.application = action.payload;
        // },
    },
    extraReducer: (builder) => {
        builder.addCase(getApplication.pending, (state) =>{
            state.loading = true;
        });
        builder.addCase(getApplication.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.application = action.payload;
        });

        builder.addCase(getApplication.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
        });
    },
});
//export const {loadApplication} =applicationSlice.actions;
export default applicationSlice.reducer;

