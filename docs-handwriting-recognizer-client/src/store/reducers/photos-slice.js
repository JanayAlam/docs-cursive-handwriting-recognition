import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    basePhoto: null,
};

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        addBasePhoto(state = initialState, action) {
            return {
                ...state,
                basePhoto: action.payload,
            };
        },
        removeBasePhoto(state = initialState, _action) {
            return {
                ...state,
                basePhoto: null,
            };
        },
    },
});

export const { addBasePhoto, removeBasePhoto } = photosSlice.actions;

export const selectBasePhoto = (state) => state.photos.basePhoto;

export default photosSlice.reducer;
