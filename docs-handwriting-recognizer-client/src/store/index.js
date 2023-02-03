import { configureStore } from '@reduxjs/toolkit';
import photosReducer from './reducers/photos-slice.js';
import uiReducer from './reducers/ui-slice.js';

const store = configureStore({
    reducer: {
        photos: photosReducer,
        ui: uiReducer,
    },
});

export default store;
