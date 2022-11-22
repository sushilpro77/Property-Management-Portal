import { Satellite } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../../api";

export const fetchProperties = createAsyncThunk("properties/getAll", async (params) => {
    try {
        let url = "/api/properties";
        let query = [];
        if(params && params.valueHomeType) query.push(`homeType=${params.valueHomeType}`); //todos
        if(params && params.valueLocation) query.push(`location=${params.valueLocation}`);
        if(params && params.valuePrice) query.push(`price=${params.valuePrice}`);
        if(params && params.valueNumberOfRooms) query.push(`numberOfRooms=${params.valueNumberOfRooms}`);
        if(params && params.valuePropertyType) query.push(`propertyType=${params.valuePropertyType}`);

        for(let i = 0; i < query.length; i++){
            if(i === 0) url += "?" + query[i];
            else url += "&" + query[i];
        }

        const response= await get(url);
        console.log("PRADIP", response);
        return response.data.content;
    } catch (err) {
        throw err;
    }
  });
const initialState={
    properties: [],
    loading:false,
    error:null,
    success:null,
}

//==================
const param={
    name:'property',
    initialState,
    reducers:{
        loadProperty:(state)=>{
        }
    },

    extraReducers:(builder)=>{
      builder.addCase(fetchProperties.pending, (state)=>
      {
        state.loading=true;
        state.success=false;
        state.error=false;
        state.properties=[];
      });
    //========================================================

    builder.addCase(fetchProperties.fulfilled,(state,action)=>{
      state.loading=false;
      state.success=true;
      state.error=false;
      state.properties=action.payload;
    });

    builder.addCase(fetchProperties.rejected, (state)=>{
      state.properties=[];
      state.loading=false;
      state.success=false;
      state.error=true;
    })

}}
const propertyDashboardSlice=createSlice(param);

export default propertyDashboardSlice.reducer;


