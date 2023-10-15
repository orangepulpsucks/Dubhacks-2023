import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { uiSlice } from "./slices/ui";
import { eventsSlice } from './slices/events';
import { credsSlice } from './slices/creds';

const combinedReducer = combineReducers({
    [uiSlice.name]: uiSlice.reducer,
    [eventsSlice.name]: eventsSlice.reducer,
    [credsSlice.name]: credsSlice.reducer
});

const persistConfig = {
  key: 'snip-cal-root',
  whitelist: [eventsSlice.name],
  storage
}
const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk]
});

export const persistor = persistStore(store);