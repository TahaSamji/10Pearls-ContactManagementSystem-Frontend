import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers/reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer, 
});

const persistor = persistStore(store);

export { store, persistor };
