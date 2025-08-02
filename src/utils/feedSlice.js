import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:"feedslice",//this is used for naming like in redux dev tool on chrome 
    initialState:[],
    reducers:{
        setFeed(state, action){
            return action.payload;
        },
        removeFeed(state){
            return null;
        }
    }
})
export default feedSlice.reducer;//userSlice is const here in both 
export const {setFeed,removeFeed}=feedSlice.actions;