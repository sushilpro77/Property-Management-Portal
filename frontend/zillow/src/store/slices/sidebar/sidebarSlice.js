import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideBarVisible : false
}


const params = {
  name: 'GLOBAL',
  initialState: initialState,
  reducers: {
    toogleSideBar : (state, action) => {
        state.sideBarVisible = !state.sideBarVisible;
    }
  }
}


const GlobalSlice = createSlice(params);

export const { toogleSideBar } = GlobalSlice.actions;
export default GlobalSlice;