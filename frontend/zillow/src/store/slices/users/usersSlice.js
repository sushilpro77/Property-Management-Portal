import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {get} from "../../../api";

export const fetchUsers = createAsyncThunk("users/getAll", async (params) => {
    try {
        let url = "/api/users";
        if(params) url += `?username=${params}`;
        const response = await get(url);
        return response.data;
    } catch (err){
      throw err;
    }
});

const initialState = {
    users: [],
    loading: false,
    success: null,
    error: null
};

const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        loadUsers: () => {

        }
    }, extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
            state.users = [];
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.users = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state) => {
            state.users = [];
            state.loading = false;
            state.success = false;
            state.error = true;
        });
    }
});

// export const {};
export default usersSlice.reducer;