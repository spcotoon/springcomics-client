import { createSlice } from "@reduxjs/toolkit";

const comicSlice = createSlice({
    name: 'comic',
    initialState: {
        comicHeadId: null,  
        comicBodyId: null,  
    },
    reducers: {
        setComicHeadId: (state, action) => {
            state.comicHeadId = action.payload; 
        },
        setComicBodyId: (state, action) => {
            state.comicBodyId = action.payload; 
        },
        resetComicHeadId: (state) => {
            state.comicHeadId = null; 
        },
        resetComicBodyId: (state) => {
            state.comicBodyId = null; 
        },
    },
});

export const { setComicHeadId, setComicBodyId, resetComicHeadId, resetComicBodyId } = comicSlice.actions;
export default comicSlice.reducer;
