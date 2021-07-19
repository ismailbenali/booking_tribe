import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
// And use redux-batch as an example of adding enhancers
import { reduxBatch } from '@manaflair/redux-batch';

import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['flights'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [reduxBatch],
});
export default store;
