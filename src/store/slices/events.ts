import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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
    },
    all: []
};

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setLast: (state, action) => {
            state.last = action.payload;
        },
        addEvent: (state, action) => {
            state.all.push({
                ...action.payload,
                id: uuidv4()
            });
        },
        updateEvent: (state, action) => {
            const { id, event } = action.payload;
            const index = state.all.findIndex((event: any) => event.id === id);
            if(index >= 0) {
                state.all[index] = {
                    ...event,
                    id
                };
            }
        }
    }
});

export const { setLast, addEvent, updateEvent } = eventsSlice.actions;

export const selectLastState = (state: any) => state.events.last;

export const selectAllState = (state: any) => state.events.all;

export default eventsSlice.reducer;