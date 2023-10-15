import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    last: {
        title: '',
        date: {
            day: 1,
            month: 1,
            year: 2023
        },
        description: '',
        priority: 3
    }
};

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setLast: (state, action) => {
            state.last = action.payload;
        }
    }
});

export const { setLast } = eventsSlice.actions;

export const selectLastState = (state: any) => state.events.last;

export default eventsSlice.reducer;