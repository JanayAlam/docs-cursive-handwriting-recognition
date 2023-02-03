import { createSlice } from '@reduxjs/toolkit';
import shortid from 'shortid';

const initialState = {
    notifications: {},
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        pushNotification(state = initialState, action) {
            const notification = action.payload;
            const id = shortid.generate();
            state.notifications[id] = {
                id,
                text: notification.text,
                category: notification.category,
            };
            return state;
        },
        popNotification(state = initialState, action) {
            delete state.notifications[action.payload];
            return state;
        },
    },
});

export const { pushNotification, popNotification } = uiSlice.actions;

export const selectNotifications = (state) => {
    const notifications = [];
    const keys = Object.keys(state.ui.notifications);
    for (let i = 0; i < keys.length; i++) {
        notifications.push(state.ui.notifications[keys[i]]);
    }
    return notifications;
};

export default uiSlice.reducer;
