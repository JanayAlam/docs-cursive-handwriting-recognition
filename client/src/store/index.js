import { configureStore } from '@reduxjs/toolkit';
import photosReducer from './reducers/photos-slice.js';
import resultsReducer from './reducers/results-slice.js';
import uiReducer from './reducers/ui-slice.js';

const store = configureStore({
    reducer: {
        photos: photosReducer,
        ui: uiReducer,
        results: resultsReducer,
    },
});

export default store;
