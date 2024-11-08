import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers/reducers';

const store = configureStore({
  reducer
});

const persister = 'Free';

export { store, persister };
