import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    results: [],
};

const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {
        updateResults(state = initialState, action) {
            return {
                results: action.payload,
            };
        },
    },
});

export const {
    updateResults,
} = resultsSlice.actions;


export const selectResults = (state) => {
    return state.results;
};

export default resultsSlice.reducer;
