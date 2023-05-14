import storage from 'reduxjs-toolkit-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist';
import teamFeature from './features/Team';
import questionFeature from './features/Question';
import timerFeature from './features/Timer';

// Defining Root Reducer: It contains all of our app reducers
const rootReducer = combineReducers({
  teams: teamFeature,
  questions: questionFeature,
  timer: timerFeature,
});
/*

  This will be the persisted Reducer, it will detect change in state
  and persists it again
*/
const _persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
  },
  rootReducer
);

// Defining Store Now
const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
// Finally defining and exporting persistor
export const persistor = persistStore(store);
// exporting store
export default store;
