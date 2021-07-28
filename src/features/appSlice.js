/*import {createSlice} from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name : 'app',
    initialState :{
        roomId : null,
    },
    reducer : {
        enterRoom : (state,action) => {
            state.roomId = action.payload.roomId;
        },
    },
})

export const {enterRoom} = appSlice.actions;

export const selectRoom = state => state.app.roomId;

export default appSlice.reducer; */



import {createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState:{
      roomId : null,
  },
  
  reducers: {
    enterRoom: (state,action) => {
      state.roomId = action.payload.roomId;
    },
    
  },
});

export const {enterRoom} = appSlice.actions;

export const selectRoom = (state) => state.app.roomId;


export default appSlice.reducer;