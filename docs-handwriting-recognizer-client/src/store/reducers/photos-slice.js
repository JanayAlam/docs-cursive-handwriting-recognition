import { createSlice } from '@reduxjs/toolkit';
import shortid from 'shortid';

const initialState = {
    basePhoto: null,
    croppedPhotos: {},
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
        addCroppedPhoto(state = initialState, action) {
            const photo = action.payload;
            const id = shortid.generate();
            state.croppedPhotos[id] = { id, photo };
            return state;
        },
        removeCroppedPhoto(state = initialState, action) {
            try {
                delete state.croppedPhotos[action.payload];
            } catch (e) {
                console.warn(e.message);
            }
            return state;
        },
    },
});

export const {
    addBasePhoto,
    removeBasePhoto,
    addCroppedPhoto,
    removeCroppedPhoto,
} = photosSlice.actions;

export const selectBasePhoto = (state) => state.photos.basePhoto;

export const selectCroppedPhotos = (state) => {
    const photos = [];
    const keys = Object.keys(state.photos.croppedPhotos);
    for (let i = 0; i < keys.length; i++) {
        photos.push(state.photos.croppedPhotos[keys[i]]);
    }
    return photos;
};

export default photosSlice.reducer;
