// store.js

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import customStorage from './custom_store';
import { empReducer } from './reducer/emp_reducer';
import { authReducer } from './reducer/user_reducer';

const reducers = combineReducers({
  auth: authReducer,
  emp: empReducer

});

const persistConfig = {
  key: 'root',
  storage: customStorage, // Using customStorage instead of storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
export { store, persistor };
