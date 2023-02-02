import { configureStore } from '@reduxjs/toolkit';
import photosReducer from './reducers/photos-slice.js';

const store = configureStore({
    reducer: {
        photos: photosReducer,
    },
});

export default store;
