import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { uiSlice } from "./slices/ui";
import { eventsSlice } from './slices/events';

const combinedReducer = combineReducers({
    [uiSlice.name]: uiSlice.reducer,
    [eventsSlice.name]: eventsSlice.reducer
});

const persistConfig = {
  key: 'snip-cal-root',
  whitelist: [],
  storage
}
const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk]
});

export const persistor = persistStore(store);