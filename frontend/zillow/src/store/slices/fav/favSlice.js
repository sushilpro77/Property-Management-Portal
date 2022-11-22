import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteRequest, get, post, put } from "../../../api";

export const fetchFavList = createAsyncThunk("fetch/fav", 
  async(params) => {
    try {
    const res = await get('/api/fav-lists');
    return res.data;
  } catch (err) {
    throw err;
  }
  }
)

export const createFavList = createAsyncThunk("create/fav", 
  async(params) => {
    const res = await post('/api/fav-lists', params);
    return res.data;
  }
)

export const editFavList = createAsyncThunk("edit/fav", 
  async(params) => {
    const res = await put('/api/fav-lists/'+params.id, params);
    return res.data;
  }
)

export const deleteFavList = createAsyncThunk("delete/fav", 
  async(params) => {
    const res = await deleteRequest('/api/fav-lists/'+params);
    return res.data;
  }
)

export const addFavItem = createAsyncThunk("add/fav/item", 
  async(params) => {
    const res = await put('/api/fav-lists/item/'+params.id, params);
    return res.data;
  }
)

export const deleteFavItem = createAsyncThunk("delete/fav", 
  async(params) => {
    const res = await deleteRequest('/api/fav-lists/item/'+params);
    return res.data;
  }
)

const initialState = {
  isFirst: true,
  loading: false,
  favList: [],
  token: null,
  error: null,
  success: null,
};

const favSlice = createSlice({
  name:"fav/list",
  initialState,
  reducers:{
    setAddEditForm: (state,action) => {
      state.isFirst = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavList.fulfilled, (state, action) => {
      state.favList = action.payload;
      state.success = true;
      state.error = false;
    });
    builder.addCase(fetchFavList.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchFavList.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
    builder.addCase(createFavList.fulfilled, (state, action) => {
      state.favList.push(action.payload);
      state.success = true;
      state.error = false;
    });
    builder.addCase(createFavList.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    })
    builder.addCase(editFavList.fulfilled, (state, action) => {
      // state.favList = action.payload;
      state.success = true;
      state.error = false;
    });
    builder.addCase(editFavList.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    })
    builder.addCase(deleteFavList.fulfilled, (state, action) => {
      // state.favList = action.payload;
      state.success = true;
      state.error = false;
    });
    builder.addCase(deleteFavList.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    })
    // ====================================================================
    builder.addCase(addFavItem.fulfilled, (state, action) => {
      // state.favList = action.payload;
      state.success = true;
      state.error = false;
    });
    builder.addCase(addFavItem.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    })
  }

})

export const { setAddEditForm } = favSlice.actions; 
export default favSlice;