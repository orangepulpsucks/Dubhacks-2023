import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    token: ''
};

export const credsSlice = createSlice({
    name: 'creds',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        }
    }
});

export const { setToken } = credsSlice.actions;

export const selectTokenState = (state: any) => state.creds.token;

export default credsSlice.reducer;